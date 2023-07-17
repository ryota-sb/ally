import { useEffect } from "react";

import { useAuth0 } from "@auth0/auth0-react";
import jwt from "jsonwebtoken";

// Recoil
import { useSetRecoilState } from "recoil";
import userState from "recoil/atoms/userState";
import profileState from "recoil/atoms/profileState";

// Cookie
import { destroyCookie } from "nookies";

type DecodeTokenExpire = {
  exp: number;
};

const useAuth0TokenExpiration = () => {
  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);

  const { getIdTokenClaims, logout, isAuthenticated } = useAuth0();

  // IDトークンを解析して、トークンの期限を取得する
  const getTokenExpirationDate = (idToken: string): Date | null => {
    const decoded = jwt.decode(idToken) as DecodeTokenExpire;
    if (!decoded) return null;
    const expireAt = decoded.exp * 1000;
    return new Date(expireAt);
  };

  useEffect(() => {
    // 認証されていれば、5秒間に1回トークンの有効期限を監視し、有効期限が切れていたらログアウトする
    if (!isAuthenticated) return;
    const intervalId = setInterval(async () => {
      const claims = await getIdTokenClaims();
      if (!claims) return;
      const tokenExpirationDate = getTokenExpirationDate(claims.__raw);
      if (!tokenExpirationDate) return;
      const timeUntilExpiration = tokenExpirationDate.getTime() - Date.now();
      if (timeUntilExpiration < 0) {
        destroyCookie(null, "accessToken");
        setUser("");
        setProfile("");
        logout({ returnTo: window.location.origin });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [getIdTokenClaims, logout, isAuthenticated]);
};

export default useAuth0TokenExpiration;

import { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";

// Recoil
import { useSetRecoilState } from "recoil";
import userState from "recoil/atoms/userState";
import profileState from "recoil/atoms/profileState";

// Cookie
import { setCookie } from "nookies";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "pages/loading";

import getBasePath from "lib/getBasePath";

// 2秒後にルートパスに画面遷移
if (typeof window !== "undefined") {
  if (window.location.pathname === "/callback") {
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }
}

const Callback: NextPage = () => {
  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // Auth0のアクセストークン取得、Recoilへ保存
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setCookie(null, "accessToken", accessToken, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });

        if (accessToken) {
          axios
            .get(`${getBasePath()}/api/v1/login`, {
              headers: { Authorization: `Bearer ${accessToken}` },
            })
            .then((res) => {
              setUser(res.data.user);
              setProfile(res.data.profile);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };

    getToken();
  });

  return <Loading />;
};

export default Callback;

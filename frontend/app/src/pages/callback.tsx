import { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";

// Recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import tokenState from "recoil/atoms/tokenState";
import userState from "recoil/atoms/userState";
import profileState from "recoil/atoms/profileState";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "pages/loading";

import getBasePath from "lib/getBasePath";

// 2秒後にルートパスに画面遷移
if (typeof window !== "undefined") {
  if (window.location.pathname === "/callback") {
    setTimeout(() => {
      window.location.href = "/";
    }, 100000);
  }
}

const Callback: NextPage = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // Auth0のアクセストークン取得、Recoilへ保存
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    };

    getToken();

    if (token) {
      axios
        .get(`${getBasePath()}/api/v1/login`, {
          headers: { Authorization: `Bearer ${token}` },
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
  });

  return <Loading />;
};

export default Callback;

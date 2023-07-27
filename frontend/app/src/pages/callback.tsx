import { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";

import getBasePath from "lib/getBasePath";

// Recoil
import { useRecoilState } from "recoil";
import userState from "recoil/atoms/userState";
import profileState from "recoil/atoms/profileState";

// Cookie
import { setCookie } from "nookies";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "pages/loading";

const Callback: NextPage = () => {
  const [user, setUser] = useRecoilState(userState);
  const [profile, setProfile] = useRecoilState(profileState);
  const { getAccessTokenSilently } = useAuth0();

  // 2秒後にルートパスに遷移
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/callback" && user && profile) {
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }
  }, [user, profile]);

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

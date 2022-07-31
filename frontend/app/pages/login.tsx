import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import tokenState from "../recoil/atoms/tokenState";

const LoginPage: NextPage = () => {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  const router = useRouter();
  const setToken = useSetRecoilState(tokenState);

  // ログイン後にトークンを取得し、Recoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>ログイン中</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            ログアウト
          </button>
          <button
            onClick={() => {
              router.push("blog");
            }}
          >
            記事ページへ
          </button>
        </>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
};

export default LoginPage;

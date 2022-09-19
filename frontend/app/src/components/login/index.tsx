import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import tokenState from "../../recoil/atoms/tokenState";

const Login: NextPage = () => {
  const { isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
  const router = useRouter();
  const setToken = useSetRecoilState(tokenState);
  const { loginWithRedirect } = useAuth0();

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
          <button
            onClick={() => {
              router.push("blog");
            }}
          >
            記事ページへ
          </button>
        </>
      ) : (
        <div className="grid grid-cols-1">
          <button
            className="mb-2 transform rounded-md bg-green-600  px-4 py-2 capitalize text-white transition-colors duration-500 hover:bg-green-500"
            onClick={() => loginWithRedirect()}
          >
            はじめての方
          </button>
          <button
            className="transform rounded-md bg-blue-600 px-4 py-2 capitalize text-white transition-colors duration-500 hover:bg-blue-500"
            onClick={() => loginWithRedirect()}
          >
            ログイン
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

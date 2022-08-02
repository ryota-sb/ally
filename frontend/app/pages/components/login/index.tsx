import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import tokenState from "../../../recoil/atoms/tokenState";

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
            className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            onClick={() => loginWithRedirect()}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;

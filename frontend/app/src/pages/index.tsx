import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header/Header";
import Login from "../components/Login/Login";

import { useAuth0 } from "@auth0/auth0-react";

// header token 確認用
import { useRecoilValue } from "recoil";
import tokenState from "../recoil/atoms/tokenState";

const Home: NextPage = () => {
  const { isAuthenticated } = useAuth0();
  const token = useRecoilValue(tokenState);
  return (
    <div>
      <Head>
        <title>Ally</title>
      </Head>
      <Header />
      <main>
        {isAuthenticated ? (
          <div className="mx-auto w-full max-w-sm truncate rounded-md bg-white px-4 py-3 shadow-md dark:bg-gray-800">
            <p>{token}</p>
          </div>
        ) : (
          <div className="flex h-screen w-screen items-center justify-center">
            <Login />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

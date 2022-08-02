import type { NextPage } from "next";
import Head from "next/head";
import Header from "./components/header";
import Login from "./components/login";

// header token 確認用
import { useRecoilValue } from "recoil";
import tokenState from "../recoil/atoms/tokenState";

const Home: NextPage = () => {
  const token = useRecoilValue(tokenState);
  return (
    <div>
      <Head>
        <title>Ally</title>
      </Head>
      <Header />
      <main>
        <div className="truncate w-full max-w-sm px-4 py-3 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <p>{token}</p>
        </div>
        <div className="h-screen w-screen flex justify-center items-center">
          <Login />
        </div>
      </main>
    </div>
  );
};

export default Home;

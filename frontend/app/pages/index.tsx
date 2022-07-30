import type { NextPage } from "next";
import Head from "next/head";
import { useAuth0 } from "@auth0/auth0-react";

const Home: NextPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <Head>
        <title>Ally</title>
      </Head>
      <main>
        <button onClick={() => loginWithRedirect()}>ログイン</button>
      </main>
    </div>
  );
};

export default Home;

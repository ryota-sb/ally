import type { NextPage } from "next";
import Head from "next/head";

import { useAuth0 } from "@auth0/auth0-react";

import Users from "pages/users";
import Loading from "pages/loading";
import Layout from "components/Layout";
import Login from "components/Login";

const Home: NextPage = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <Head>
        <title>Ally</title>
      </Head>
      <Layout>
        <main>
          {isAuthenticated ? (
            <Users />
          ) : isLoading ? (
            <Loading />
          ) : (
            <div className="flex h-screen w-screen items-center justify-center">
              <Login />
            </div>
          )}
        </main>
      </Layout>
    </div>
  );
};

export default Home;

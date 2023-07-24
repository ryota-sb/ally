import type { NextPage } from "next";
import Head from "next/head";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Components and pages
import Users from "pages/users";
import Loading from "pages/loading";
import Layout from "components/Layout";
import Login from "components/Login";

// Cookie
import { parseCookies } from "nookies";

const Home: NextPage = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const accessToken = parseCookies().accessToken;

  return (
    <div>
      <Head>
        <title>Ally</title>
      </Head>
      <Layout>
        <main>
          {accessToken || isAuthenticated ? (
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

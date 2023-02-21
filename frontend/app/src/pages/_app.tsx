import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const redirectUri = `${process.env["NEXT_PUBLIC_CALLBACK_URL"]}`;

  return (
    <Auth0Provider
      domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
      clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
      audience={process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!}
      redirectUri={redirectUri}
    >
      <RecoilRoot>
        <Component {...pageProps} />
        <ToastContainer theme="colored" autoClose={2000} hideProgressBar />
      </RecoilRoot>
    </Auth0Provider>
  );
}

export default MyApp;

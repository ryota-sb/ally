import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";

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
      </RecoilRoot>
    </Auth0Provider>
  );
}

export default MyApp;

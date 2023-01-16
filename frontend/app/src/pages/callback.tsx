import { NextPage } from "next";
import { useEffect } from "react";

import { useRecoilState } from "recoil";
import tokenState from "recoil/atoms/tokenState";
import userState from "recoil/atoms/userState";

import { useAuth0 } from "@auth0/auth0-react";

import Loading from "pages/loading";

import axios from "axios";

// ３秒後にルートパスに画面遷移
if (typeof window !== "undefined") {
  if (window.location.pathname === "/callback") {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
}

const Callback: NextPage = () => {
  const [token, setToken] = useRecoilState(tokenState);
  const [user, setUser] = useRecoilState(userState);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    // Auth0のアクセストークン取得、Recoilへ保存
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    getToken();

    if (token) {
      axios
        .get("http://localhost:3000/api/v1/login", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return <Loading />;
};

export default Callback;

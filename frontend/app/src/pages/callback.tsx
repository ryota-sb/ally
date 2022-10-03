import { NextPage } from "next";
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import tokenState from "../recoil/atoms/tokenState";

if (typeof window !== "undefined") {
  if (window.location.pathname === "/callback") {
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
}

const Callback: NextPage = () => {
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/login", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(token);
      });
  });

  return (
    <div>
      <h1>ログインが完了しました。３秒後にページを移動します。</h1>
    </div>
  );
};

export default Callback;

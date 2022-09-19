import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import tokenState from "../recoil/atoms/tokenState";

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
      });
  });

  return (
    <div>
      <h1>Waiting...</h1>
    </div>
  );
};

export default Callback;

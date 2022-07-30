import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";
import React from "react";

const LoginPage: NextPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? <p>ログイン中</p> : <p>ログインしてください</p>}
    </div>
  );
};

export default LoginPage;

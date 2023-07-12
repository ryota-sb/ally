import { useAuth0 } from "@auth0/auth0-react";

import TestLoginButton from "./TestLoginButton";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="m-10 max-w-sm">
      <div className="grid grid-cols-1 gap-3">
        <button
          className="transform rounded-md bg-green-600  px-4 py-2 capitalize text-white transition-colors duration-500 hover:bg-green-500"
          onClick={() => loginWithRedirect()}
        >
          はじめての方
        </button>
        <button
          className="transform rounded-md bg-blue-600 px-4 py-2 capitalize text-white transition-colors duration-500 hover:bg-blue-500"
          onClick={() => loginWithRedirect()}
        >
          ログイン
        </button>
        <TestLoginButton />
      </div>
    </div>
  );
};

export default Login;

import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";

const Login: FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <div className="grid grid-cols-1">
        <button
          className="mb-2 transform rounded-md bg-green-600  px-4 py-2 capitalize text-white transition-colors duration-500 hover:bg-green-500"
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
      </div>
    </div>
  );
};

export default Login;

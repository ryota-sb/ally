import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const RedirectToLogin: FC = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

export default RedirectToLogin;

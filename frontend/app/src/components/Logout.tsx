import { FC } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSetRecoilState } from "recoil";
import tokenState from "recoil/atoms/tokenState";
import userState from "recoil/atoms/userState";
import profileState from "recoil/atoms/profileState";

const Logout: FC = () => {
  const { logout } = useAuth0();
  const setToken = useSetRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);

  const userLogout = () => {
    setToken("");
    setUser("");
    setProfile("");
    logout({ returnTo: window.location.origin });
  };

  return <button onClick={() => userLogout()}>ログアウト</button>;
};

export default Logout;

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// Recoil
import { useSetRecoilState } from "recoil";
import userState from "recoil/atoms/userState";
import profileState from "recoil/atoms/profileState";

// Cookie
import { destroyCookie } from "nookies";

const Logout: React.FC = () => {
  const { logout } = useAuth0();

  const setUser = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(profileState);

  const userLogout = () => {
    destroyCookie(null, "accessToken");
    setUser("");
    setProfile("");
    logout({ returnTo: window.location.origin });
  };

  return <button onClick={() => userLogout()}>ログアウト</button>;
};

export default Logout;

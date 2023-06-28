import { ReactNode } from "react";

import useAuth0TokenExpiration from "hooks/useAuth0TokenExpiration";

import Header from "components/Header";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  useAuth0TokenExpiration();
  return (
    <>
      <Header />
      {children}
    </>
  );
}

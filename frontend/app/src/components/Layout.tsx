import { ReactNode } from "react";

import Header from "components/Header";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <Header />
      {children}
    </div>
  );
}

import { useRef } from "react";
import Link from "next/link";

import { useAuth0 } from "@auth0/auth0-react";

import Logout from "components/Logout";
import NavToggleIcon from "components/NavToggleIcon";
import Navigation from "components/Navigation";

import { useDimensions } from "hooks/useDimensions";

// Framer Motion
import { motion, useCycle } from "framer-motion";

// Recoil
import { useRecoilValue } from "recoil";
import userState from "recoil/atoms/userState";

type CustomLinkProps = {
  href: string;
  name: string;
};

const CustomLink = ({ href, name }: CustomLinkProps) => {
  return (
    <div className="mx-2 mt-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-300 md:mt-0">
      <Link href={href}>{name}</Link>
    </div>
  );
};

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(25px at 248px 33px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const currentUser = useRecoilValue(userState);

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <div className="container mx-auto flex items-center justify-between px-6 py-4">
      <h1 className="text-3xl font-bold text-gray-800 hover:text-gray-700">
        Ally
      </h1>

      {/* PC size */}
      <nav className="mx-4 hidden flex-col md:mx-8 md:flex md:flex-row md:items-center">
        {isAuthenticated ? (
          <>
            <CustomLink href={"/likes"} name={"いいねした・された"} />
            <CustomLink href={"/chatRooms"} name={"マッチング"} />
            <CustomLink href={"/"} name={"探す"} />
            <CustomLink
              href={`/users/${currentUser.id}`}
              name={"プロフィール"}
            />
            <div className="mx-2 mt-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-300 md:mt-0">
              <Logout />
            </div>
          </>
        ) : (
          <CustomLink href={"/"} name={"ホーム"} />
        )}
      </nav>

      {/* Mobile size */}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className="flex w-[200px] items-center md:hidden"
      >
        <motion.div
          variants={sidebar}
          className="absolute top-0 right-0 bottom-0 flex w-[300px] items-center justify-end bg-gray-300 bg-opacity-90"
        />
        <Navigation />
        <NavToggleIcon toggle={() => toggleOpen()} />
      </motion.nav>
    </div>
  );
};

export default Header;

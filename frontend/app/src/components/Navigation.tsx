import { motion } from "framer-motion";
import NavItem from "components/NavItem";

// Recoil
import { useRecoilValue } from "recoil";
import userState from "recoil/atoms/userState";

import Logout from "components/Logout";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = () => {
  const currentUser = useRecoilValue(userState);

  const items = [
    { name: "いいねした・された", href: "/likes" },
    { name: "マッチング", href: "/chatRooms" },
    { name: "探す", href: "/" },
    { name: "プロフィール", href: `/users/${currentUser.id}` },
    { name: "ログアウト", component: <Logout /> },
  ];

  return (
    <motion.ul
      variants={variants}
      className="absolute top-[90px] right-0 z-30 flex w-[230px] flex-col gap-4"
    >
      {items.map((item, index) => (
        <NavItem
          item={item.name}
          href={item.href}
          key={index}
          component={item.component}
        />
      ))}
    </motion.ul>
  );
};

export default Navigation;

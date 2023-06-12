import { motion } from "framer-motion";
import NavItem from "components/NavItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const items = ["探す", "プロフィール", "ログアウト"];

const Navigation = () => (
  <motion.ul
    variants={variants}
    className="absolute top-[68px] right-0 flex w-[230px] flex-col gap-4 p-[25px]"
  >
    {items.map((item, index) => (
      <NavItem item={item} key={index} />
    ))}
  </motion.ul>
);

export default Navigation;

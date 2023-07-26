import Link from "next/link";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const NavItem = ({ item, href, component }: any) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer"
          >
            <h3 className="text-md">{item}</h3>
          </motion.li>
        </Link>
      ) : (
        <motion.li
          variants={variants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <h3 className="text-md">{component}</h3>
        </motion.li>
      )}
    </>
  );
};

export default NavItem;

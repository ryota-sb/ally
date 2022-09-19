import { atom } from "recoil";

const userState = atom({
  key: "sub",
  default: "",
});

export default userState;

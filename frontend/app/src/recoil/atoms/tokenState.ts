import { atom } from "recoil";

const tokenState = atom({
  key: "tokenState",
  default: "",
});

export default tokenState;

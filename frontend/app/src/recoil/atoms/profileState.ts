import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const profileState = atom({
  key: "profileState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export default profileState;

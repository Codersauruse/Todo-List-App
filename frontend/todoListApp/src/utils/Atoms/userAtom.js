// userAtom.js
import { atom } from "recoil";

export const userAtom = atom({
  key: "user",
  default: "",
});

export const isOpenState = atom({
  key: "isOpenState",
  default: false,
});

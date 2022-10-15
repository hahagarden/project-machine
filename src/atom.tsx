import { atom } from "recoil";

export const loggedInUserAtom = atom<any>({
  key: "loggedInUser",
  default: null,
});

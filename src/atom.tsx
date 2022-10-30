import { atom } from "recoil";
import { ILoggedInUser } from "./App";

export const loggedInUserAtom = atom<ILoggedInUser | null>({
  key: "loggedInUser",
  default: null,
});

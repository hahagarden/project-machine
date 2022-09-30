import { atom } from "recoil";

export interface IUser {
  username: string;
  name: string;
  password: string;
}

export const UserAtom = atom<IUser[]>({
  key: "user",
  default: [],
});

import { atom } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: IUser) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface IUser {
  username: string;
  name: string;
  password: string;
}

export const joinedUserAtom = atom<IUser[]>({
  key: "joinedUser",
  default: [],
  effects: [localStorageEffect("joinedUser")],
});

export const loggedInUserAtom = atom<IUser>({
  key: "loggedInUser",
  default: { username: "", name: "", password: "" },
  effects: [localStorageEffect("loggedInUser")],
});

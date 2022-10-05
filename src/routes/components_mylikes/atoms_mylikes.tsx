import { atom, selector } from "recoil";

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: ISong) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export interface ISong {
  id: string;
  rank: number;
  title: string;
  singer: string;
  genre: string;
}

export const songsAtom = atom<ISong[]>({
  key: "songs",
  default: [],
  effects: [localStorageEffect("songs")],
});

export const songsSelector = selector<ISong[]>({
  key: "songsSelector",
  get: ({ get }) => {
    const songs = get(songsAtom);
    return songs;
  },
  set: ({ set }, newValue) => {
    set(songsAtom, newValue);
  },
});

export const registerModalOnAtom = atom({
  key: "registerModalOn",
  default: false,
});

export const updateModalOnAtom = atom<boolean[]>({
  key: "updateModalOn",
  default: [],
});

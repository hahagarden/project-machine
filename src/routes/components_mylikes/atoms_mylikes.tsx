import { atom, selector, selectorFamily } from "recoil";

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

export enum songGenres {
  "JPOP" = "JPOP",
  "KPOP" = "KPOP",
}
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

export const songsSelector = selectorFamily({
  key: "songsSelector",
  get:
    (genre) =>
    ({ get }) => {
      const songs = get(songsAtom);
      const genreSongs = songs.filter((song) => song.genre == genre);
      return genreSongs;
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

import { atom, selector, selectorFamily } from "recoil";

export const songGenres = {
  JPOP: "JPOP",
  KPOP: "KPOP",
  POP: "POP",
};

export interface InterfaceSong {
  id: string;
  createdAt: number;
  updatedAt: number;
  creatorId: string;
  genre: string;
  singer: string;
  title: string;
}

export interface IRanking {
  [songId: string]: number;
}

export const songsFireAtom = atom<InterfaceSong[]>({
  key: "songsFireAtom",
  default: [],
});

export const songsFireSelector = selector<InterfaceSong[]>({
  key: "songsFireSelector",
  get: ({ get }) => {
    const songs = get(songsFireAtom);
    return songs;
  },
  set: ({ set }, newValue) => {
    set(songsFireAtom, newValue);
  },
});

export const rankingFireAtom = atom<IRanking>({
  key: "rankingFireAtom",
  default: {},
});

export const songsGenreSelector = selectorFamily({
  key: "songsGenreSelector",
  get:
    (genre) =>
    ({ get }) => {
      const songs = get(songsFireAtom);
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

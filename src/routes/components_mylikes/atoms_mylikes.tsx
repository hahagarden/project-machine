import { atom, selectorFamily } from "recoil";

export interface ITemplate {
  [category: string]: { [key: string]: string } | null;
}

export const myLikesTemplateAtom = atom<ITemplate>({
  key: "mylikesTemplateAtom",
  default: {},
});

export const myLikesCategoryAtom = atom({
  key: "mylikesCategoryAtom",
  default: "",
});

export const songGenres = {
  JPOP: "JPOP",
  KPOP: "KPOP",
  POP: "POP",
};

export interface ILike {
  id: string;
  createdAt: number;
  updatedAt: number;
  creatorId: string;
  genre: string;
  singer: string;
  title: string;
  [key: string]: string | number;
}

export interface IRanking {
  [songId: string]: number;
}

export const likesFireAtom = atom<ILike[]>({
  key: "likesFireAtom",


export const likesRankingFireAtom = atom<IRanking>({
  key: "likesRankingFireAtom",
  default: {},
});

export const likesGenreSelector = selectorFamily({
  key: "likesGenreSelector",
  get:
    (option) =>
    ({ get }) => {
      const likes = get(likesFireAtom);
      const template = get(myLikesTemplateAtom);
      const currentCategory = get(myLikesCategoryAtom);
      const selectedLikes = likes.filter(
        (like) => like[template[currentCategory]?.selectingAttr || ""] == option
      );
      return selectedLikes;
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

import { atom, selectorFamily } from "recoil";

export interface ICategoryTemplate {
  [category: string]: { [key: string]: string } | null;
}

export const categoryTemplateAtom = atom<ICategoryTemplate>({
  key: "categoryTemplateAtom",
  default: {},
});

export const currentCategoryAtom = atom({
  key: "currentCategoryAtom",
  default: "",
});

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

export const likesAtom = atom<ILike[]>({
  key: "likesAtom",
  default: [],
});

export const likesRankingAtom = atom<IRanking>({
  key: "likesRankingAtom",
  default: {},
});

export const likesBoardSelector = selectorFamily({
  key: "likesBoardSelector",
  get:
    (option) =>
    ({ get }) => {
      const likes = get(likesAtom);
      const template = get(categoryTemplateAtom);
      const currentCategory = get(currentCategoryAtom);
      const selectedLikes = likes.filter(
        (like) => like[template[currentCategory]?.selectingAttr || ""] == option
      );
      return selectedLikes;
    },
});

export const registerModalOnAtom = atom({
  key: "registerModalOnAtom",
  default: false,
});

export const updateModalOnAtom = atom<boolean[]>({
  key: "updateModalOnAtom",
  default: [],
});

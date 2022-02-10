import { atom } from "recoil";
import { IItem } from "./Items";

export interface ICategory {
  name: string;
  items?: IItem[];
}

const initializedCategories: ICategory[] = [];

export const selectCategoriesState = atom({
  key: "selectCategoriesState",
  default: initializedCategories,
});

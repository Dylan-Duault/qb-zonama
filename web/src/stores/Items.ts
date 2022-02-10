import { atom, selector } from "recoil";
import { ICategory } from "./Categories";
import { getItems } from "../services/ItemService";

export interface IItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category_name: string;
}

const initializedItems: IItem[] = [];

export const allItemsState = selector<IItem[]>({
  key: "allItemsState",
  get: async ({ get }) => {
    try {
      const response = await getItems();
      return response || [];
    } catch (error) {
      console.error(`Error while getting items: \n${error}`);
      return [];
    }
  },
});

export const selectItemsState = atom({
  key: "selectItemsState",
  default: allItemsState,
});

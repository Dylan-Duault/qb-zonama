import { atom } from "recoil";
import { IItem } from "./Items";

export interface ICart {
  items: IItem[] | null;
}

const initializedCart: ICart = {
  items: null,
};

export const selectCartState = atom({
  key: "selectCartState",
  default: initializedCart,
});

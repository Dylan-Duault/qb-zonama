import { atom, selector } from "recoil";
import { IItem } from "./Items";

export interface ICart {
  items: IItem[];
  price: number;
}

export interface ICartItem {
  item: IItem;
  quantity: number;
}

const initializedCart: ICart = {
  items: [],
  price: 0,
};

export const addItemToCart = selector({
  key: "addItemToCart",
  get: ({ get }) => {
    return get(selectCartState);
  },
  set: ({ set, get }, newItem) => {
    const currentCart = get(selectCartState);
    return set(selectCartState, {
      price: currentCart.price + (newItem as IItem).price,
      items: [...get(selectCartState).items, newItem] as IItem[],
    });
  },
});

export const removeItemFromCart = selector({
  key: "removeItemFromCart",
  get: ({ get }) => {
    return get(selectCartState);
  },
  set: ({ set, get }, itemToRemove) => {
    const currentCart = get(selectCartState);
    const newItems = [...currentCart.items] as IItem[];
    const index = newItems.findIndex(
      (item) => item.id === (itemToRemove as IItem).id
    );

    let newPrice = currentCart.price;
    if (index > -1) {
      newItems.splice(index, 1);
      newPrice = currentCart.price - (itemToRemove as IItem).price;
    }

    return set(selectCartState, {
      price: newPrice,
      items: newItems,
    });
  },
});

export const clearCart = selector({
  key: "clearCart",
  get: ({ get }) => {
    return get(selectCartState);
  },
  set: ({ set }, bool) => {
    return set(selectCartState, {
      price: 0,
      items: [],
    });
  },
});

export const selectCartState = atom({
  key: "selectCartState",
  default: initializedCart,
});

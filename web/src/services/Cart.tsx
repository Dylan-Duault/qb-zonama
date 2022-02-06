import { itemInterface } from "./ItemService";
import { useNuiEvent } from "../hooks/useNuiEvent";

const Cart = () => {
  const items: itemInterface[] = [];

  const getCartPrice = (): number => {
    return items.reduce((acc, item) => {
      return acc + item.item_price;
    }, 0);
  };

  const addItem = (item: itemInterface): void => {
    items.push(item);
  };

  const removeItem = (item: itemInterface): void => {
    items.splice(items.indexOf(item), 1);
  };

  const clearCart = (): void => {
    items.splice(0, items.length);
  };

  const buy = (): void => {
    interface responseInterface {
      success: boolean;
    }

    useNuiEvent<responseInterface>("myAction", (response) => {
      if (response.success) {
        clearCart();
      }
      return response.success;
    });
  };
};

export default Cart;

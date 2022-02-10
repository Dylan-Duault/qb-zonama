import { useNuiEvent } from "../hooks/useNuiEvent";
import { IItem } from "../stores/Items";

const Cart = () => {
  const items: IItem[] = [];

  const getCartPrice = (): number => {
    return items.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
  };

  const addItem = (item: IItem): void => {
    items.push(item);
  };

  const removeItem = (item: IItem): void => {
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

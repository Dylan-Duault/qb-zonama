import { Box, Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CartItem from "../components/CartItem";
import { clearCart, ICart, ICartItem, selectCartState } from "../stores/Cart";
import { fetchNui } from "../utils/fetchNui";

const Cart: React.FC = () => {
  const cart = useRecoilValue(selectCartState);
  const setClearCart = useSetRecoilState(clearCart);

  const [uniqueItemsWithQuantity, setUniqueItemsWithQuantity] = useState(
    [] as ICartItem[]
  );

  useEffect(() => {
    setUniqueItemsWithQuantity(getUniqueItemsWithQuantity(cart));
  }, [cart]);

  const payCart = () => {
    const itemsForNui = uniqueItemsWithQuantity.map((cartItem: ICartItem) => {
      return {
        id: cartItem.item.id,
        quantity: cartItem.quantity,
      };
    });

    fetchNui("zonama:client:create-order", {
      items: itemsForNui,
      price: cart.price,
    }).then((res) => {
      if (res === true) {
        setClearCart(true);
      }
    });
  };

  return (
    <Grid
      m={5}
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap={4}
      textAlign={"left"}
    >
      <GridItem colSpan={4} backgroundColor={"#f2f9ff"} px={4} pb={4}>
        <Image src=""></Image>
        {uniqueItemsWithQuantity.sort(compareItems).map((cartItem, index) => (
          <CartItem
            item={cartItem.item}
            quantity={cartItem.quantity}
            lastItem={index === uniqueItemsWithQuantity.length - 1}
            key={index}
          ></CartItem>
        ))}
      </GridItem>
      <GridItem colSpan={1}>
        <Box backgroundColor={"#f2f9ff"} p={4}>
          {" "}
          <Text fontSize={"lg"} mb={3}>
            Subtotal ({cart.items.length} items):{" "}
            <Text fontSize={"lg"} fontWeight={600} as={"span"}>
              ${cart.price}
            </Text>
          </Text>
          <Button
            w={"full"}
            backgroundColor={"#ffd814"}
            fontSize={"sm"}
            onClick={() => payCart()}
            disabled={cart.items.length === 0}
          >
            Proceed to checkout
          </Button>
        </Box>
      </GridItem>
    </Grid>
  );
};

const getUniqueItemsWithQuantity = (cart: ICart): ICartItem[] => {
  const items = cart.items;
  const cartItems = [] as ICartItem[];

  items.forEach((item) => {
    // check if this item is already in the cartItems
    const index = cartItems.findIndex(
      (cartItem) => cartItem.item.id === item.id
    );

    if (index === -1) {
      // if not, add it to the cartItems
      cartItems.push({
        item,
        quantity: 1,
      });
    } else {
      // Item is already in cartItems, so we increase the quantity
      cartItems[index].quantity++;
    }
  });

  return cartItems;
};

const compareItems = (a: ICartItem, b: ICartItem) => {
  if (a.item.name < b.item.name) {
    return -1;
  }
  if (a.item.name > b.item.name) {
    return 1;
  }
  return 0;
};

export default Cart;

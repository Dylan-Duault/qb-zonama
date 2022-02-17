import { Box, Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { addItemToCart, removeItemFromCart } from "../stores/Cart";
import { IItem } from "../stores/Items";

interface Props {
  item: IItem;
  quantity: number;
  lastItem: boolean;
}

const CartItem: React.FC<Props> = ({ item, quantity, lastItem }) => {
  const setAddItemToCart = useSetRecoilState(addItemToCart);
  const setRemoveItemFromCart = useSetRecoilState(removeItemFromCart);

  return (
    <Flex
      flexDir={"row"}
      py={4}
      borderBottom={lastItem ? "none" : "2px"}
      borderBottomColor={"#eaeded"}
    >
      {/* <Image maxH={180} src="https://bit.ly/dan-abramov" alt="Dan Abramov" /> */}
      <Box
        h={180}
        w={180}
        backgroundSize={"cover"}
        backgroundImage={
          'url("' +
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Oahu_Landscape.jpg/640px-Oahu_Landscape.jpg" +
          '")'
        }
        alt="Dan Abramov"
      />
      <Flex flex={1} flexDir={"column"} px={4}>
        <Flex alignItems={"center"}>
          <Text fontSize={"lg"} fontWeight={600}>
            {item.name}
          </Text>
          <Spacer />
          <Text fontWeight={600} fontSize={"md"}>
            ${item.price}
          </Text>
        </Flex>
        <Text>{item.description}</Text>
        <Text fontSize={"xs"} color={"green.500"}>
          In Stock
        </Text>
        <Spacer />
        <Flex alignItems={"center"}>
          <Button
            backgroundColor={"#ffd814"}
            size={"sm"}
            onClick={() => setRemoveItemFromCart(item)}
          >
            -
          </Button>
          <Text px={4}>{quantity}</Text>
          <Button
            backgroundColor={"#ffd814"}
            size={"sm"}
            onClick={() => setAddItemToCart(item)}
          >
            +
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;

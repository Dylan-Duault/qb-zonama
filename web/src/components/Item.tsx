import { Box, Button, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { addItemToCart } from "../stores/Cart";
import { IItem } from "../stores/Items";

interface Props {
  item: IItem;
}

const Item: React.FC<Props> = ({ item }) => {
  const setAddItemToCart = useSetRecoilState(addItemToCart);

  const getItemImage = (): string => {
    const url =
      item.image.length > 20
        ? item.image
        : `https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Oahu_Landscape.jpg/640px-Oahu_Landscape.jpg`;
    return `url(${url})`;
  };

  return (
    <Box textAlign={"center"} px={4} minW={"20vw"}>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"md"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            {item.name}
          </Text>
          <Box
            minW={"150px"}
            w={"max-content"}
            h={"150px"}
            rounded={"xl"}
            backgroundSize={"cover"}
            backgroundImage={getItemImage()}
            alt="Random Pic"
          />
          <Text fontSize={"sm"} fontWeight={500} p={2} px={3} rounded={"full"}>
            ${item.price}
          </Text>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <Text overflowY={"auto"} maxH={100}>
            {item.description}
          </Text>

          <Button
            mt={10}
            maxW={"200px"}
            w={"full"}
            bg={"#ffa41c"}
            color={"white"}
            rounded={"md"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "#d78914",
            }}
            _focus={{
              bg: "#e7951a",
            }}
            onClick={() => {
              setAddItemToCart(item);
            }}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;

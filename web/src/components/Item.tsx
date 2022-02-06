import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

// import check icon from react-icons/go
import { GoCheck } from "react-icons/go";
import { itemInterface } from "../services/ItemService";

interface Props {
  item: itemInterface;
}

const Item: React.FC<Props> = ({ item }) => {
  return (
    <Center mx={5} py={6}>
      <Box
        w={"100%"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"xl"}
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
            {item.item_name}
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>$</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              {item.item_price}
            </Text>
            <Text color={"gray.500"}></Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <Text overflowY={"auto"} h={100}>
            {item.item_description}
          </Text>

          <Button
            colorScheme={"dark"}
            mt={10}
            w={"full"}
            bg={"#ffa41c"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "#e7951a",
            }}
            _focus={{
              bg: "#e7951a",
            }}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default Item;

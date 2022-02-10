import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import ItemSwiper from "../components/ItemSwiper";
import { IItem, selectItemsState } from "../stores/Items";
import { ICategory } from "../stores/Categories";
import { getCategories } from "../services/ItemService";
import { useRecoilState } from "recoil";

const Home: React.FC = () => {
  const [items, setItems] = useRecoilState(selectItemsState);
  const [categories, setCategories] = useState([] as ICategory[]);

  useEffect(() => {
    getCategories(items).then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <Stack
      textAlign={"center"}
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={10}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        Shopping made{" "}
        <Text as={"span"} color={"orange.400"}>
          easy
        </Text>
      </Heading>
      <Text>
        Scroll through the categories or select a category that match your
        desires !
      </Text>
      {categories.map((category: ICategory, index) => (
        <ItemSwiper key={index} category={category.name} />
      ))}
    </Stack>
  );
};

const scrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    width: "8px",
    backgroundColor: "#eaeaea",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgb(50, 50, 50, 0.8)",
    borderRadius: "50px",
  },
};

export default Home;

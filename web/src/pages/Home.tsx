import { Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ItemSwiper from "../components/ItemSwiper";
import { getCategories } from "../services/ItemService";
import { ICategory } from "../stores/Categories";
import { selectItemsState } from "../stores/Items";

const Home: React.FC = () => {
  const items = useRecoilValue(selectItemsState);
  const [categories, setCategories] = useState([] as ICategory[]);

  useEffect(() => {
    getCategories(items).then((categories) => {
      setCategories(categories);
    });
  }, [items]);

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

export default Home;

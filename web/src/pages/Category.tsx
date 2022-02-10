import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { IItem, selectItemsState } from "../stores/Items";
import { useRecoilState } from "recoil";

const Category: React.FC = () => {
  let { key } = useParams();

  const [items, setItems] = useRecoilState(selectItemsState);
  const [itemsFromCategory, setItemsFromCategory] = useState([] as IItem[]);

  useEffect(() => {
    const _itemsFromCategory = items.filter(
      (item) => item.category_name === key
    );

    setItemsFromCategory(_itemsFromCategory);
  }, [key]);

  return (
    <Box>
      <Box>Category is {key}</Box>
      {itemsFromCategory.map((item) => (
        <Box key={item.name}>{item.name}</Box>
      ))}
    </Box>
  );
};

export default Category;

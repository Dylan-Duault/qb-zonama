import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IItem, selectItemsState } from "../stores/Items";

const Category: React.FC = () => {
  let { key } = useParams();

  const items = useRecoilValue(selectItemsState);
  const [itemsFromCategory, setItemsFromCategory] = useState([] as IItem[]);

  useEffect(() => {
    const _itemsFromCategory = items.filter(
      (item) => item.category_name === key
    );

    setItemsFromCategory(_itemsFromCategory);
  }, [key, items]);

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

import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getItemsFromCategory, itemInterface } from "../services/ItemService";

const Category: React.FC = () => {
  let { key } = useParams();

  const [items, setItems] = useState<itemInterface[] | null>(null);

  useEffect(() => {
    getItemsFromCategory(key!).then((data) => {
      setItems(data);
    });
  }, [key]);

  return (
    <Box>
      <Box>Category is {key}</Box>
    </Box>
  );
};

export default Category;

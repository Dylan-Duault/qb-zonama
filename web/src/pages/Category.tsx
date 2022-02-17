import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { IItem, selectItemsState } from "../stores/Items";
import { chunk } from "lodash";
import Item from "../components/Item";

const Category: React.FC = () => {
  let { key } = useParams();

  const items = useRecoilValue(selectItemsState);
  const [itemsFromCategory, setItemsFromCategory] = useState([] as IItem[]);

  useEffect(() => {
    const _itemsFromCategory = items.filter(
      (item) => item.category_name === key
    );

    // setItemsFromCategory([]);
    setItemsFromCategory(_itemsFromCategory);
  }, [key]);

  return (
    <Box px={6} pb={10}>
      {chunk(itemsFromCategory, 4).map((items: IItem[], index) => {
        return (
          <Grid templateColumns="repeat(4, 1fr)" gap={0}>
            {items.map((item: IItem) => (
              <Box pt={10}>
                <Item item={item}></Item>
              </Box>
            ))}
          </Grid>
        );
      })}
    </Box>
  );
};

export default Category;

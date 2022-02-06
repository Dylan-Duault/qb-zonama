import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import ItemSwiper from "../components/ItemSwiper";
import { items } from "../services/ItemService";

const Home: React.FC = () => {
  // Create a page that display all categories

  return (
    <Box>
      <ItemSwiper category={"food"} />
    </Box>
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

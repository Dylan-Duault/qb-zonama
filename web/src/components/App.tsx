import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Home from "../pages/Home";
import { debugData } from "../utils/debugData";
import NavBar from "./NavBar";

// This will set the NUI to visible if we are
// developing in browser
debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

const App: React.FC = () => {
  return (
    <Flex
      textAlign={"center"}
      height={"100%"}
      align={"center"}
      display={"flex"}
      justifyContent={"center"}
      justifyItems={"center"}
    >
      <Box
        backgroundColor={"#eaeded"}
        width={"85%"}
        height={"85%"}
        display={"flex"}
        flexDir={"column"}
      >
        <NavBar />
        <Box flex={1} overflowY={"auto"} css={scrollbarStyles}>
          <Routes>
            <Route path="/web/build/index.html" element={<Home />} />
            <Route path="/web/build" element={<Home />} />
            <Route path="/category/:key" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Box>
      </Box>
    </Flex>
  );
};

export const scrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "gray",
  },
};

export default App;

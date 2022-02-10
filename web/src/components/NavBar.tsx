import { Box, Button, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ReactComponent as ZonamaLogo } from "../assets/svg/logo.svg";
import { getCategories } from "../services/ItemService";
import { ICategory } from "../stores/Categories";
import { selectItemsState } from "../stores/Items";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const navigateTo = useCallback(
    (link) => navigate(link, { replace: true }),
    [navigate]
  );

  const items = useRecoilValue(selectItemsState);
  const [categories, setCategories] = useState([] as ICategory[]);

  useEffect(() => {
    getCategories(items).then((categories) => {
      setCategories(categories);
    });
  }, [items]);

  return (
    <Flex
      width={"100%"}
      height={"100px"}
      display={"flex"}
      flexDir={"column"}
      justifyItems={"center"}
      color={"white"}
    >
      <Flex
        backgroundColor={"#131921"}
        height={"60px"}
        justifyItems={"center"}
        alignItems={"center"}
        px={5}
      >
        <Button
          colorScheme={"dark"}
          pt={2}
          onClick={() => navigateTo("/web/build/")}
        >
          <ZonamaLogo height={30} />
        </Button>

        <Flex px={5} textAlign={"left"} alignItems={"center"}>
          <Icon as={GoLocation} mr={2} />
          <Box fontSize="xs" color={"whiteAlpha.800"}>
            Deliver to
            <Text fontWeight={700}>San Andreas</Text>
          </Box>
        </Flex>
        <Spacer />
        <Button
          colorScheme={"dark"}
          onClick={() => {
            navigateTo("/cart");
          }}
        >
          <GiShoppingCart size={32} />
        </Button>
      </Flex>

      <Flex backgroundColor={"#232f3e"} flex={1}>
        <Button colorScheme={"dark"} onClick={() => navigateTo("/web/build/")}>
          <Text fontSize={"sm"}>All</Text>
        </Button>
        {categories?.map((category, index) => (
          <Button
            key={index}
            colorScheme={"dark"}
            onClick={() => navigateTo("/category/" + category.name)}
          >
            <Text fontSize={"sm"}>{category.name}</Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default NavBar;

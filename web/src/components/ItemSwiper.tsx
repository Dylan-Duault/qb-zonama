import { Box, Button, Container, Flex, Heading, Icon } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "../components/Item";

// Import Swiper styles
import "swiper/css";
import { useRecoilValue } from "recoil";
import { IItem, selectItemsState } from "../stores/Items";
import { useEffect, useState } from "react";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import SwiperCore, { Autoplay, Navigation } from "swiper";
SwiperCore.use([Autoplay, Navigation]);

interface Props {
  category: string;
}

const ItemSwiper: React.FC<Props> = ({ category }) => {
  const items = useRecoilValue(selectItemsState);
  const [itemsFromCategory, setItemsFromCategory] = useState([] as IItem[]);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    const _itemsFromCategory = items.filter(
      (item) => item.category_name === category
    );

    setItemsFromCategory(_itemsFromCategory);
  }, [category, items]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (loaded) {
    return (
      <Container maxW="container.4xl" textAlign={"center"} py={5}>
        <Heading fontWeight={600} pt={4} backgroundColor={"#fff8f5"}>
          {category}
        </Heading>
        <Flex
          boxShadow="sm"
          textAlign={"left"}
          alignItems={"center"}
          backgroundColor={"#fff8f5"}
        >
          <Button
            className={"prev-" + category}
            my={5}
            height={"300px"}
            backgroundColor={"white"}
            mr={3}
            justifyContent={"center"}
            borderStartRadius={"0px"}
          >
            <Icon as={AiOutlineArrowLeft} />
          </Button>
          <Swiper
            slidesPerView={
              itemsFromCategory.length > 4 ? 4 : itemsFromCategory.length
            }
            autoplay={{ delay: 5000 }}
            navigation={{
              prevEl: ".prev-" + category,
              nextEl: ".next-" + category,
            }}
          >
            {itemsFromCategory?.map((item, index) => (
              <SwiperSlide key={index}>
                <Item item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button
            className={"next-" + category}
            my={5}
            height={"300px"}
            backgroundColor={"white"}
            ml={3}
            justifyContent={"center"}
            borderEndRadius={"0px"}
          >
            <Icon as={AiOutlineArrowRight} />
          </Button>
        </Flex>
      </Container>
    );
  }
  return <Box>Loading...</Box>;
};

export default ItemSwiper;

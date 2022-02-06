import { Box, Center, Container, Heading, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import Item from "../components/Item";

// Import Swiper styles
import "swiper/css";
import { useEffect, useState } from "react";
import { getItemsFromCategory, itemInterface } from "../services/ItemService";

SwiperCore.use([Autoplay]);

interface Props {
  category: string;
}

const ItemSwiper: React.FC<Props> = ({ category }) => {
  const [items, setItems] = useState<itemInterface[]>();

  useEffect(() => {
    // This is so ugly, HAS to be fixed using redux
    setTimeout(() => {
      getItemsFromCategory(category).then((res) => {
        setItems(res);
      });
    }, 1000);
  }, [category]);

  return (
    <Container maxW="container.4xl">
      <Box mt={4} backgroundColor={"#e9edf3"} boxShadow="sm" textAlign={"left"}>
        <Swiper slidesPerView={4} autoplay={{ delay: 5000 }}>
          {items?.map((item, index) => (
            <SwiperSlide key={index}>
              <Item item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default ItemSwiper;

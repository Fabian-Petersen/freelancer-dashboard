import { SimpleGrid } from "@chakra-ui/react";
import CardItem from "./CardItem";

const Cards = () => {
  return (
    <SimpleGrid
      columns={{ base: 2, lg: 4 }}
      width="100%"
      gap={{ base: 4, lg: 4 }}

      // border="1px solid red"
    >
      <CardItem />
    </SimpleGrid>
  );
};

export default Cards;

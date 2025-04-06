import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import HeaderActionButtons from "./HeaderActionButtons";

const Header = () => {
  return (
    <Flex
      bg="white"
      px={8}
      py="4"
      justifyContent="space-between"
      alignItems="center"
      border="gray.300"
      borderBottomWidth="1px"
    >
      <Heading fontSize="4xl">Dashboard</Heading>
      <HeaderActionButtons />
    </Flex>
  );
};

export default Header;

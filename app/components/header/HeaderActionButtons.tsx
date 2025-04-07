import React from "react";
import { BellDot } from "lucide-react";
import { Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import WelcomeMessage from "./WelcomeMessage";

const HeaderActionButtons = () => {
  return (
    <Flex gap="6" alignItems="center">
      <WelcomeMessage />
      <SearchInput />
      <BellDot size={24} color="black" />
    </Flex>
  );
};

export default HeaderActionButtons;

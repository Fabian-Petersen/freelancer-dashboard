import React from "react";
import { BellDot } from "lucide-react";
import { Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import WelcomeMessage from "./WelcomeMessage";

const HeaderActionButtons = () => {
  return (
    <Flex gap="4" alignItems="center">
      <WelcomeMessage />
      <SearchInput />
      <BellDot size={32} />
    </Flex>
  );
};

export default HeaderActionButtons;

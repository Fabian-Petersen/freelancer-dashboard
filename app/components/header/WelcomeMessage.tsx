import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const WelcomeMessage = () => {
  return (
    <Flex
      fontSize="1rem"
      color="black"
      fontWeight="bold"
      justifyContent={"center"}
      gap={4}
    >
      <Text>
        Welcome back, Fabian
        <Box as="span" fontSize={20}>
          👋
        </Box>
      </Text>
    </Flex>
  );
};

export default WelcomeMessage;

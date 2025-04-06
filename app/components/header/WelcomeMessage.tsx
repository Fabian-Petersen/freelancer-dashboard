import React from "react";
import { Container, Text, Box, Flex } from "@chakra-ui/react";
import { MdWavingHand } from "react-icons/md";
import { WavingHand } from "lucide-react";

const WelcomeMessage = () => {
  return (
    <Container>
      <Flex fontSize="1rem" fontWeight="bold" justifyContent={"center"} gap={2}>
        <Text>Welcome Back, Fabian</Text>
        <Box as="span">
          <MdWavingHand size={24} color="gray.500" />
        </Box>
      </Flex>
    </Container>
  );
};

export default WelcomeMessage;

import { Flex, Box } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import ActionButton from "./ActionButton";

const HomePageHeader = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="end"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      w="100%"
      px={4}
      py={3}
      // border="1px solid red"
      height={{ base: "3rem", sm: "5rem" }}
    >
      <Flex
        alignItems="center"
        gap={{ base: 2, sm: 4 }}
        justifyContent="end"
        width={{ base: "100%" }}
        maxWidth={{ base: "100%", lg: "50%" }}
      >
        <Box
          bg="transparent"
          color={{ base: "yellow.500", _dark: "blue.200" }}
          _hover={{
            bgColor: { base: "transparent", _dark: "transparent" },
          }}
        >
          <ColorModeButton
            color={{ base: "yellow.500", _dark: "blue.200" }}
            _hover={{
              bgColor: { base: "gray.200/70", _dark: "gray.500/40" },
            }}
          />
        </Box>
        <ActionButton title="login" />
        <ActionButton title="register" />
      </Flex>
    </Flex>
  );
};

export default HomePageHeader;

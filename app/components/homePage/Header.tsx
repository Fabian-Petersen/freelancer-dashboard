import { Flex } from "@chakra-ui/react";
import ActionButton from "./ActionButton";

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="end"
      bgColor="transparent"
      w="100%"
      px={4}
      py={3}
      height="5rem"
    >
      <Flex
        alignItems="center"
        gap={4}
        justifyContent="end"
        width={{ base: "100%" }}
        maxWidth={{ base: "100%", lg: "50%" }}
      >
        <ActionButton title="login" />
        <ActionButton title="register" />
      </Flex>
    </Flex>
  );
};

export default Header;

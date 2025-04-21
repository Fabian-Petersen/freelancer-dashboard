import { Image } from "@chakra-ui/react";

const Logo = () => (
  <Image
    h="200px"
    w="250px"
    color={{ base: "gray.600", _dark: "white" }}
    fit="contain"
    bg="transparent"
    fontSize={100}
    src="../../images/logo-white-text-no-bg.png"
    alt="logo"
  />
);

export default Logo;

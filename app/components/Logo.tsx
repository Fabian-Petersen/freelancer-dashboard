import { Image } from "@chakra-ui/react";

const Logo = () => (
  <Image
    h="200px"
    w="250px"
    color="white"
    fit="contain"
    bg="transparent"
    fontSize={100}
    src="../../images/logo-white-text-no-bg.png"
    alt="logo"
  />
);

export default Logo;

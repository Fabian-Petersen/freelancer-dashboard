import { Box } from "@chakra-ui/react";
import Header from "./components/homePage/Header";

export default function Home() {
  return (
    <Box
      height={{ base: "100vh" }}
      minHeight="100vh"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      position="relative"
      // border="1px dashed red"
    >
      <Header />
    </Box>
  );
}

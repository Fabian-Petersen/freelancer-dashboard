import { Container } from "@chakra-ui/react";
import HomePageContent from "@/app/components/homePage/HomePageContent";

export default function Home() {
  return (
    <Container
      as="main"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      p={{ base: "0 1rem 1rem 1rem", lg: "0 4rem 0rem 4rem" }}
      // border="1px solid yellow"
      height="100%"
    >
      <HomePageContent />
    </Container>
  );
}

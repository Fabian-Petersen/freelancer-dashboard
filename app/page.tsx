import { Container } from "@chakra-ui/react";
import HomePageContent from "@/app/components/homePage/HomePageContent";

export default function Home() {
  return (
    <Container
      as="main"
      height={{ base: "100vh" }}
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      p={{ base: "0 1rem 1rem 1rem", lg: "0 4rem 2rem 4rem" }}
    >
      <HomePageContent />
    </Container>
  );
}

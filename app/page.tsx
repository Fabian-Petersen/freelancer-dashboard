import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/homePage/Header";
import MainContent from "@/app/components/homePage/MainContent";

export default function Home() {
  return (
    <Grid
      height={{ base: "100vh" }}
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      // border="1px dashed red"
      gap="0"
      p="0 2rem 2rem 2rem"
      templateRows="5rem 1fr"
    >
      <GridItem>
        <Header />
      </GridItem>
      <GridItem>
        <MainContent />
      </GridItem>
    </Grid>
  );
}

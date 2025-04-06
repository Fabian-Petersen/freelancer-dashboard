"use client";

import { Grid, GridItem } from "@chakra-ui/react";
import Header from "../header/Header";
const DashboardLayout = () => {
  return (
    <Grid
      minH="100vh"
      templateColumns="(1fr,auto, 1fr)"
      templateRows="(10rem, auto)"
    >
      {/* Main content area with padding to account for fixed sidebar */}
      <GridItem as="header" w="100%" bg="gray.100" colSpan={3}>
        <Header />
      </GridItem>
      <GridItem
        as="main"
        w="100%"
        height={"100%"}
        bg="gray.50"
        colSpan={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
      ></GridItem>
    </Grid>
  );
};

export default DashboardLayout;

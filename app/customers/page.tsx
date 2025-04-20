import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import CustomerTable from "../components/customers/CustomerTable";

export default function page() {
  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      overflowX={{ base: "hidden" }}
      // p={{ base: 0.5, md: 1, lg: 1.5 }}
      // height="100vh"
      gap={4}
      width="100%"
      maxHeight="100vh"
      // border="1px dashed red"
    >
      <GridItem colSpan={{ xl: 4 }} placeContent={"center"} px="5">
        <CustomerTable />
      </GridItem>
    </Grid>
  );
}

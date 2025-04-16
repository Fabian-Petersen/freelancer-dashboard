import React from "react";
import { Grid, GridItem, Text, Flex, Button } from "@chakra-ui/react";
import Image from "next/image";

export default function MainContent() {
  return (
    <Grid
      border="1px dashed yellow"
      width="100%"
      height="100%"
      py="100px"
      templateColumns="repeat(2, 1fr)"
    >
      <GridItem height="100%" border="1px solid green" py="2rem">
        <Flex direction="column" gap={4}>
          <Text
            fontSize={{ base: "", xl: "4rem" }}
            lineHeight={"4rem"}
            fontWeight={"semibold"}
          >
            Manage your Projects in one place
          </Text>
          <Text fontSize={{ base: "", xl: "1rem" }}>
            Project management software that enables your teams to collaborate,
            plan, analyze and manage everyday tasks
          </Text>
          <Button colorPalette="teal" width={{ base: "", xl: "10rem" }}>
            Get Started
          </Button>
        </Flex>
      </GridItem>
      <GridItem border="1px solid green">
        <Image src="" alt="" fill></Image>
      </GridItem>
    </Grid>
  );
}

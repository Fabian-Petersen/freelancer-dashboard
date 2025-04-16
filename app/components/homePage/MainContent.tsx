"use client";

import React from "react";
import { Grid, GridItem, Text, Flex, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MainContent() {
  const router = useRouter();
  return (
    <Grid
      // border="1px dashed red"
      width="100%"
      height="100%"
      py={{ base: "30px", lg: "100px" }}
      templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
      templateRows={{ base: "auto 1fr", sm: "1fr" }}
      gap={{ base: 0 }}
    >
      <GridItem
        height={{ lg: "100%" }}
        // border="2px solid green"
        alignSelf={{ base: "start", sm: "normal" }}
      >
        <Flex
          direction="column"
          gap={{ base: "6", lg: 4 }}
          justifyContent={{ base: "start", sm: "center" }}
          // border="1px solid blue"
          height={{ base: "auto", sm: "100%" }}
        >
          <Text
            fontSize={{ base: "2rem", sm: "2.3rem", lg: "3.5rem", xl: "4rem" }}
            lineHeight={{ base: "2.5rem", sm: "2.5rem", lg: "4rem" }}
            letterSpacing={{ base: "0.5px", md: "1.5px" }}
            fontWeight={"bold"}
            color={{ base: "gray.700", _dark: "white" }}
          >
            Manage your Projects in one place
          </Text>
          <Text
            fontSize={{ base: "0.8rem", xl: "1rem" }}
            width={{ base: "100%", lg: "70%" }}
          >
            Freelance Project management software that enables you to plan,
            analyze and manage everyday tasks
          </Text>
          <Button
            colorPalette="teal"
            mt={{ base: "0rem", lg: "2rem" }}
            width={{ base: "8rem", xl: "10rem" }}
            py={{ base: "1rem", lg: "1.5rem" }}
            rounded="5rem"
            fontSize={{ base: "0.9rem", xl: "1rem" }}
            onClick={() => router.push("/dashboard")}
            _hover={{ color: "teal.100", cursor: "pointer" }}
          >
            Get Started
          </Button>
        </Flex>
      </GridItem>
      <GridItem
        // border="2px solid green"
        position="relative"
      >
        <Image src="/images/hero-image.svg" alt="hero-image" fill />
      </GridItem>
    </Grid>
  );
}

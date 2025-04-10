"use client";

import {
  Box,
  Text,
  Flex,
  List,
  VStack,
  Container,
  Separator,
} from "@chakra-ui/react";
import SidebarNavItem from "./SidebarNavItem";
import SidebarLogoutButton from "./SidebarLogoutButton";
import {
  navbarLinks,
  PreferencesLinks,
} from "../../../public/data/navbarLinks";

// $ Sidebar Component
const Sidebar = () => {
  return (
    <Container
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      width={{ lg: "240px" }}
      bgColor={{ base: "#f8fafd", _dark: "#002147" }}
      opacity={{ base: "hidden", lg: "visible" }}
      borderRight="1px"
      borderRightColor={{ base: "gray.300", _dark: "white" }}
      overflow-y="auto"
      zIndex="100"
      maxHeight={"100vh"}
      // border="1px solid red"
      p={2}
    >
      <Box py="20px"></Box>
      <Flex height="100vh" direction={"column"}>
        <Text
          color="gray.700"
          fontSize={{ base: "0.75rem", lg: "1rem" }}
          paddingBottom="0.2rem"
        >
          Main Menu
        </Text>
        <Separator />
        {/* Main navigation links */}
        <List.Root>
          <VStack align="stretch">
            {navbarLinks.map((item) => (
              <SidebarNavItem
                key={item.name}
                icon={item.icon}
                isActive={item.isActive}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </SidebarNavItem>
            ))}
            {/* Divider for preferences links */}
            <Separator />
            {/* // $ Middle Section */}

            <Text
              color="gray.700"
              fontSize={{ base: "0.75rem", lg: "1rem" }}
              paddingBottom="0.2rem"
            >
              Preferences
            </Text>
            {/* Preferences links */}
            {PreferencesLinks.map((item) => (
              <SidebarNavItem key={item.name} icon={item.icon}>
                {item.name}
              </SidebarNavItem>
            ))}
          </VStack>
        </List.Root>
        <Box h="1px" bg="gray.100/30" my={4} />
        {/* Logout at the very bottom */}
        <Separator />
      </Flex>
      <Box
        cursor="pointer"
        position="absolute"
        bottom="00%"
        translate="auto"
        translateY="-50"
        zIndex={1000}
        left="0"
        width="100%"
      >
        <SidebarLogoutButton />
      </Box>
    </Container>
  );
};

export default Sidebar;

"use client";

import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import SidebarNavItem from "./SidebarNavItem";
import SidebarLogoutButton from "./SidebarLogoutButton";
import {
  navbarLinks,
  PreferencesLinks,
} from "../../../public/data/navbarLinks";

// $ Sidebar Component
const Sidebar = () => {
  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      width={"233px"}
      bg="#f8fafd"
      opacity={{ base: "hidden", lg: "visible" }}
      borderRight="1px"
      borderRightColor="gray.300"
      overflow-y="auto"
      zIndex={"100"}
    >
      <Text fontSize="2xl" fontWeight="bold" color="blue.500" p="4">
        Freelancer
      </Text>

      <Flex height="100vh">
        <VStack>
          <Text color="gray.100" fontSize="0.8rem" paddingBottom="0.2rem">
            Main Menu
          </Text>
          {/* Main navigation links */}
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
          {/* <Box h="1px" bg="gray.100/30" my={4} /> */}
          {/* // $ Middle Section */}

          <Text color="gray.100" fontSize="0.8rem" paddingBottom="0.2rem">
            Preferences
          </Text>
          {/* Preferences links */}
          {PreferencesLinks.map((item) => (
            <SidebarNavItem key={item.name} icon={item.icon}>
              {item.name}
            </SidebarNavItem>
          ))}
          <Box h="1px" bg="gray.100/30" my={4} />
          <Box flexGrow={1}>
            <SidebarLogoutButton />
          </Box>
          {/* Logout at the very bottom */}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;

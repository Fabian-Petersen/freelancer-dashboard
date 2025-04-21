"use client";

import {
  Box,
  Text,
  Flex,
  List,
  VStack,
  Container,
  IconButton,
} from "@chakra-ui/react";
import SidebarNavItem from "./SidebarNavItem";
import SidebarLogoutButton from "./SidebarLogoutButton";
import Logo from "../Logo";
import Link from "next/link";
import Seperator from "../sidebar/Seperator";

import {
  navbarLinks,
  PreferencesLinks,
} from "../../../public/data/navbarLinks";
import { X } from "lucide-react";

import { useGlobalContext } from "@/app/contexts/useGlobalContext";

// $ Sidebar Component
const Sidebar = () => {
  const { setIsOpen, setActiveItem, activeItem, isOpen } = useGlobalContext();

  return (
    <Container
      as="nav"
      position="fixed"
      top="0"
      left="0"
      width={{ base: "230px", lg: "240px" }}
      bgColor={{ base: "rgba(29,39,57)", _dark: "#1d2739" }}
      borderRight={{ base: "1px solid white", _dark: "1px solid #37415180" }}
      overflow-y="auto"
      height="100vh"
      transform={{
        base: isOpen ? "translateX(0)" : "translateX(-100%)",
        lg: "translateX(0)",
      }}
      transition="transform 0.3s ease"
      zIndex="1000"
      p={2}
    >
      <Box
        position="absolute"
        top={-58}
        left={-9}
        zIndex={-100}
        translate={"-50%, -50%"}
      >
        <Logo />
      </Box>
      <IconButton
        onClick={() => setIsOpen(false)}
        position="absolute"
        visibility={{ base: "visible", lg: "hidden" }}
        right={3}
        top={3.5}
        bgColor="transparent"
        color={{ base: "gray.600", _dark: "blue.200" }}
        _hover={{
          bgColor: { base: "transparent", _dark: "gray.500/40" },
          color: { base: "gray.700", _dark: "gray.200" },
        }}
      >
        <X size={20} />
      </IconButton>

      <Flex
        height="100vh"
        direction={"column"}
        gap={1}
        mt={"5rem"}
        color={{ base: "gray.700", _dark: "white" }}
      >
        <Seperator height="0.5px" />
        <Text
          color={{ base: "gray.100", _dark: "white" }}
          fontSize={{ base: "0.75rem", lg: "0.8rem" }}
          paddingBottom="0.2rem"
        >
          Main Menu
        </Text>
        {/* <Separator /> */}
        {/* Main navigation links */}
        <List.Root>
          <VStack align="stretch">
            {navbarLinks.map((item) => (
              <Link href={`${item.url}`} key={item.name}>
                <SidebarNavItem
                  icon={item.icon}
                  isActive={activeItem === item.name}
                  onClick={() => setActiveItem(item.name)}
                  url={item.url}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </SidebarNavItem>
              </Link>
            ))}
            {/* Divider for preferences links */}

            <Seperator height="0.5px" />
            {/* // $ Middle Section */}

            <Text
              color={{ base: "gray.100", _dark: "white" }}
              fontSize={{ base: "0.75rem", lg: "0.8rem" }}
              paddingBottom="0.2rem"
            >
              Preferences
            </Text>
            {/* Preferences links */}
            {PreferencesLinks.map((item) => (
              <Link href={`${item.url}`} key={item.name}>
                <SidebarNavItem
                  key={item.name}
                  icon={item.icon}
                  url={item.url}
                  isActive={activeItem === item.name}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.name}
                </SidebarNavItem>
              </Link>
            ))}
          </VStack>
        </List.Root>
        <Seperator height="0.5px" />
        {/* Logout at the very bottom */}
      </Flex>
      <Box
        position="absolute"
        bottom="0%"
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

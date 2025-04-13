"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import { LogOut } from "lucide-react";

const SidebarLogoutButton = () => {
  return (
    <Button
      width="100%"
      px="4"
      py="6"
      rounded={"none"}
      bgColor={{ base: "white", _dark: "#1d2739" }}
      color={{ base: "red.500" }}
      onClick={() => alert("Logout button clicked")}
      _hover={{ bgColor: "#222e44", cursor: "pointer", color: "red.600" }}
    >
      <Flex gap={4} alignItems="center" width={"100%"}>
        <LogOut size={18} />
        <Text fontSize="1.1rem">Logout</Text>
      </Flex>
    </Button>
  );
};

export default SidebarLogoutButton;

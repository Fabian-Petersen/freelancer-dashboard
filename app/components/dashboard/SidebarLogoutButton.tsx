"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import { LogOut } from "lucide-react";

const SidebarLogoutButton = () => {
  return (
    <Button
      width="100%"
      px="4"
      py="6"
      cursor="pointer"
      rounded={"none"}
      color={{ base: "red.500" }}
      bgColor="red.200"
      _hover={{ bgColor: "red.300" }}
      onClick={() => alert("Logout button clicked")}
    >
      <Flex gap={4} alignItems="center" width={"100%"}>
        <LogOut size={18} />
        <Text fontSize="1.1rem">Logout</Text>
      </Flex>
    </Button>
  );
};

export default SidebarLogoutButton;

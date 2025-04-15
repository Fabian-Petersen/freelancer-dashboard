"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const SidebarLogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, call API)
    router.push("/"); // Navigate to home page
  };

  return (
    <Button
      width="100%"
      px="4"
      py="6"
      rounded={"none"}
      bgColor={{ base: "white", _dark: "#1d2739" }}
      color={{ base: "red.500" }}
      onClick={handleLogout}
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

"use client";
// $ Hook handling the logic for logging user out of session
import { useLogout } from "@/app/utils/aws-signout";

// $ Chakra Components
import { Button, Flex, Text } from "@chakra-ui/react";

// $ Icons
import { LogOut } from "lucide-react";

const SidebarLogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <Button
      width="100%"
      px="4"
      py="6"
      rounded={"none"}
      bgColor={{ base: "rgba(29,39,57,0.1)", _dark: "#1d2739" }}
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

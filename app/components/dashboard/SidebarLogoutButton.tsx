"use client";

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useRouter } from "next/navigation";

// $ Chakra Components
import { Button, Flex, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
// $ Icons
import { LogOut } from "lucide-react";

// $ AWS Functions
import { awsCognitoSignOut } from "@/app/utils/aws-signout";

const SidebarLogoutButton = () => {
  const { userAttributes } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await awsCognitoSignOut();
      toaster.create({
        type: "info",
        title: "Logging Out..",
        description: `Goodbye ${userAttributes?.name}`,
        duration: 3000,
      });
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      router.push("/");
    }
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

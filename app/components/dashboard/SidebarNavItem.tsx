import React from "react";
import { Text, Flex, BoxProps, List } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";

interface NavItemProps extends BoxProps {
  icon: LucideIcon;
  children: React.ReactNode;
  isActive?: boolean;
}

const SidebarNavItem = ({ icon: Icon, children, isActive }: NavItemProps) => {
  return (
    <List.Item
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight={isActive ? "semibold" : "normal"}
      transition=".15s ease"
      borderLeftWidth={isActive ? "3px" : ""}
      borderLeftColor={"blue.500"}
      borderLeftRadius={0}
      color={{ base: "gray.600", _dark: "white" }}
      bgColor={isActive ? "transparent" : "transparent"}
      _hover={{
        bg: "blue.600",
        color: "white",
        borderRadius: "sm",
        borderLeftColor: "transparent",
      }}
    >
      <Flex gap="4" alignItems="center" width="100%">
        <Icon size={18} />
        <Text fontSize="1rem">{children}</Text>
      </Flex>
    </List.Item>
  );
};

export default SidebarNavItem;

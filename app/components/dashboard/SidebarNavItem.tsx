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
      color={isActive ? "blue.500" : "gray.600"}
      borderRadius="md"
      _hover={{
        bg: "blue.300",
        color: "blue.500",
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

import React from "react";
import { Text, Flex, BoxProps, List } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavItemProps extends BoxProps {
  icon: LucideIcon;
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  url: string;
}

const usePath = () => {
  const pathName = usePathname();
  const path = pathName.replace(/\/$/, "");
  return path;
};

const SidebarNavItem = ({
  icon: Icon,
  children,
  onClick,
  // isActive,
  url,
}: NavItemProps) => {
  const path = usePath();
  return (
    <List.Item
      as="button"
      onClick={onClick}
      // px="4"
      px={path === url ? "3" : "4"}
      py="3"
      cursor="pointer"
      role="group"
      transition="0.15s ease"
      borderLeftWidth={path === url ? "3px" : ""}
      borderLeftColor={"blue.500"}
      // borderLeftRadius={0}
      width="100%"
      color="gray.100"
      bgColor={path === url ? "gray.500" : ""}
      _hover={{
        // bg: "blue.600",
        color: path === url ? "" : "teal.500",
        fontWeight: path === url ? "" : "500",
        // borderRadius: "sm",
        // borderLeftColor: "transparent",
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

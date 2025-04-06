"use client";

import { Button } from "@chakra-ui/react";
import SidebarNavItem from "./SidebarNavItem";
import { AuthLinks } from "@/public/data/navbarLinks";

const SidebarLogoutButton = () => {
  return (
    <Button
      width="100%"
      cursor="pointer"
      onClick={() => console.log("Logout button clicked")}
    >
      <SidebarNavItem
        key={AuthLinks[0].name}
        icon={AuthLinks[0].icon}
        mt="auto"
        py="0.8rem"
        width="100%"
        bgColor="#2E2E2E"
        borderRadius="0"
      >
        {AuthLinks[0].name}
      </SidebarNavItem>
    </Button>
  );
};

export default SidebarLogoutButton;

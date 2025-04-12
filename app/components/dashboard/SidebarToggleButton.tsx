"use client";

import { IconButton } from "@chakra-ui/react";
import { Menu } from "lucide-react";

type SidebarButtonProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SidebarToggleButton = ({ isOpen, setIsOpen }: SidebarButtonProps) => {
  return (
    <IconButton
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      size="md"
      color={{ base: "gray.700", _dark: "white" }}
      bgColor={"transparent"}
      onClick={() => setIsOpen(true)}
    >
      {!isOpen && <Menu size={20} />}
    </IconButton>
  );
};

export default SidebarToggleButton;

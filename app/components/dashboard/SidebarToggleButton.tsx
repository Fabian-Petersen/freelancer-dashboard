"use client";

import { IconButton } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";

type SidebarButtonProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SidebarToggleButton = ({ isOpen, setIsOpen }: SidebarButtonProps) => {
  return (
    <IconButton
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      colorScheme="blue"
      size="md"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X size={20} /> : <Menu size={20} />}
    </IconButton>
  );
};

export default SidebarToggleButton;

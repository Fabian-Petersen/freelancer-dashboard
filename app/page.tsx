"use client";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/header/Header";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import SidebarToggleButton from "../app/components/dashboard/SidebarToggleButton";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box minH="100vh">
      {/* Sidebar Toggle Button - visible only on small screens */}
      <Box
        display={{ base: "block", lg: "none" }}
        position="fixed"
        top="4"
        left="4"
        zIndex="overlay"
      >
        <SidebarToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>

      {/* Sidebar */}
      <Box
        as="aside"
        position="fixed"
        left="0"
        width="240px"
        height="100vh"
        bg="#f8fafd"
        zIndex="sticky"
        transform={{
          base: isOpen ? "translateX(0)" : "translateX(-100%)",
          lg: "translateX(0)",
        }}
        transition="transform 0.3s ease"
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        ml={{ base: isOpen ? "240px" : "0", lg: "240px" }}
        transition="margin-left 0.3s ease"
        minH="100vh"
      >
        {/* Header */}
        <Box
          as="header"
          position="sticky"
          top="0"
          zIndex="docked"
          bg="white"
          boxShadow="10px 0 10px rgba(0, 0, 0, 0.2)"
        >
          <Header />
        </Box>

        {/* Dashboard Content */}
        <DashboardLayout />
      </Box>
    </Box>
  );
}

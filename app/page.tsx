"use client";

import { Box } from "@chakra-ui/react";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/header/Header";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import ModalManager from "./components/modals/ModalManager";

export default function Home() {
  const { isOpen } = useGlobalContext();

  return (
    <Box
      minHeight="100vh"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      position="relative"
    >
      {/* //$  ============================= Modals Component - RHF  ====================== */}
      <ModalManager />
      <Box
        as="aside"
        position="fixed"
        left="0"
        width={"240px"}
        height="100vh"
        zIndex={1000}
        transform={{
          base: isOpen ? "translateX(0)" : "translateX(-100%)",
          lg: "translateX(0)",
        }}
        transition="transform 0.3s ease"
        className="dark"
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box ml={{ lg: "240px" }} transition="margin-left 0.3s ease" minH="100vh">
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

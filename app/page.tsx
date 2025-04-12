"use client";

import { Box, Container } from "@chakra-ui/react";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/header/Header";
import DashboardLayout from "./components/dashboard/DashboardLayout";
// import SidebarToggleButton from "../app/components/dashboard/SidebarToggleButton";
import NewApplicationModal from "./components/modals/NewApplicationModal";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

export default function Home() {
  const { isNewJobModalOpen, isOpen } = useGlobalContext();

  return (
    <Box
      minH="100vh"
      bgColor={{ base: "#f8fafd", _dark: "#002147/85" }}
      position="relative"
    >
      {/* //$  ============================= Modals Component - RHF  ====================== */}

      {isNewJobModalOpen && (
        <Container
          position={"fixed"}
          height={"100vh"}
          width="100%"
          visibility={isNewJobModalOpen ? "visible" : "hidden"}
          top="0"
          left="0"
          p={4}
          backdropBlur={"xl"}
          mx="auto"
          bgColor="black/60"
          zIndex={2000}
        >
          <NewApplicationModal />
        </Container>
      )}
      {/* Sidebar Toggle Button - visible only on small screens */}
      {/* <Box
        display={{ base: "block", lg: "none" }}
        position="fixed"
        top="4"
        left="4"
        zIndex="overlay"
      >
        <SidebarToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box> */}

      {/* Sidebar */}
      <Box
        as="aside"
        position="absolute"
        left="0"
        width={"240px"}
        height="100vh"
        bgColor={{
          base: "#3D90D7/20",
          _dark: "#102E50",
        }}
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

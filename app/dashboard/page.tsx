"use client";

import { Box } from "@chakra-ui/react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import ModalManager from "../components/modals/ModalManager";

export default function Dashboard() {
  return (
    <Box
      // height={{ base: "auto" }}
      height="calc(100vh - 4.2rem)"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      position="relative"
      // border="1px dashed red"
    >
      {/* //$  ============================= Modals Component - RHF  ====================== */}
      <ModalManager />
      <Box transition="margin-left 0.3s ease" height="auto">
        <DashboardLayout />
      </Box>
    </Box>
  );
}

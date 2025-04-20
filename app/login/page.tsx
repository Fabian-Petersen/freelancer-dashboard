"use client";

import LoginForm from "../components/login/LoginForm";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

export default function Login() {
  const path = usePathname();
  console.log("Current path:", path);
  return (
    <Box
      as="main"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      w="100%"
      h="100vh"
    >
      <LoginForm />
    </Box>
  );
}

import React from "react";
import RegisterForm from "../components/register/RegisterForm";
import { Box } from "@chakra-ui/react";

export default function RegisterPage() {
  return (
    <Box
      as="main"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
      w="100%"
      h="100vh"
    >
      <RegisterForm />
    </Box>
  );
}

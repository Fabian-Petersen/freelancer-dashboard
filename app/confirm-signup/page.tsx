import React from "react";
import { ConfirmSignUpForm } from "@/app/components/register/ConfirmSignUpForm";
import { Container } from "@chakra-ui/react";

export default function page() {
  return (
    <Container
      height="100vh"
      width="100%"
      mx="auto"
      bgColor={{ base: "#f8fafd", _dark: "#101827" }}
    >
      <ConfirmSignUpForm />
    </Container>
  );
}

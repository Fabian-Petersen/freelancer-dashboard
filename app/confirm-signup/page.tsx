import React from "react";
import { ConfirmSignUpForm } from "@/app/components/register/ConfirmSignUpForm";
import { Container } from "@chakra-ui/react";

export default function page() {
  return (
    <Container
      position="relative"
      height="100vh"
      width="100%"
      top="0"
      left="0"
      p={4}
      backdropFilter="blur(4px)"
      mx="auto"
      bgColor="black/60"
      zIndex={2000}
    >
      <ConfirmSignUpForm />
    </Container>
  );
}

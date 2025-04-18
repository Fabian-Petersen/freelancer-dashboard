import React from "react";
import { ResendCodeForm } from "@/app/components/register/ResendCodeForm";
import { Container } from "@chakra-ui/react";

export default function page() {
  return (
    <Container
      // position="fixed"
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
      <ResendCodeForm />
    </Container>
  );
}

"use client";

import React from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  title: "login" | "register";
};

const handleLogin = () => {
  alert("login");
};

const handleRegister = () => {
  alert("register");
};

export default function ActionButton({ title }: Props) {
  return (
    <Button
      variant={title === "login" ? "outline" : "solid"}
      colorPalette={title === "login" ? "teal" : "blue"}
      onClick={title === "login" ? handleLogin : handleRegister}
      size="lg"
      rounded="lg"
      px="1rem"
      width="7rem"
      py="0.8rem"
      textTransform={"capitalize"}
      _hover={{ outline: "none", border: "none" }}
    >
      {title}
    </Button>
  );
}

"use client";

import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

type Props = {
  title: "login" | "register";
};

export default function ActionButton({ title }: Props) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    alert("register");
  };

  return (
    <Button
      color={title === "login" ? "teal.500" : "white"}
      borderColor={title === "login" ? "teal.500" : "blue.500"}
      bgColor={title === "login" ? "transparent" : "blue.500"}
      onClick={title === "login" ? handleLogin : handleRegister}
      size={{ base: "sm", md: "lg" }}
      rounded="5rem"
      px="1rem"
      width={{ base: "5rem", md: "7rem" }}
      // py="0.8rem"
      textTransform={"capitalize"}
      _hover={
        title === "login"
          ? {
              bgColor: "teal.500",
              cursor: "pointer",
              borderColor: "teal.500",
              color: "white",
            }
          : { bgColor: "blue.600", cursor: "pointer" }
      }
    >
      {title}
    </Button>
  );
}

"use client";

import React from "react";
import ModalFormInput from "../modals/ModalFormInput";
import Link from "next/link";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
// import { useRouter } from "next/navigation";

// $ Chakra Components
import {
  Button,
  Fieldset,
  Flex,
  Stack,
  SimpleGrid,
  Box,
  Text,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

// $ React-Hook-Form, zod & schema
import { registerSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// $ Function handling the signin to aws
import { awsCognitoSignUp } from "@/app/utils/aws-signup";

type FormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  // const router = useRouter();
  const {
    // setIsConfirmSignUpModalOpen,
    isConfirmSignUpModalOpen,
    isResendCodeModalOpen,
    setSignUpEmail,
  } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegisterSubmit = async (data: FormValues) => {
    console.log("handle Submit Register Form Clicked");
    // $ try-catch to sign into aws cognito
    try {
      //$ aws-signup is the file where handling the signin to aws cognito using amplify "/utils/aws-signup.ts"
      const result = await awsCognitoSignUp(
        data.name,
        data.email,
        data.password
      );

      // $ Save email for confirmation step
      setSignUpEmail(data.email);

      if (result.isSignUpComplete) {
        toaster.create({
          type: "success",
          title: "You're all set!",
          description: "You have been signed up and auto-signed in.",
          duration: 3000,
        });

        // If you want to route to dashboard or do something else here
      } else {
        // Show confirmation modal
        console.log(
          "Confirm Modal State:",
          isConfirmSignUpModalOpen,
          "result returned from aws:",
          result.isSignUpComplete
        );
        // $ assign the user attributes to the global state to use where required
        // setIsConfirmSignUpModalOpen(true);
      }

      // $ Route to the dashboard page if successfull.
    } catch (error) {
      let errorMessage = "unexpected error";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        errorMessage = (error as { message: string }).message;
      }
      toaster.create({
        type: "error",
        title: "The registration attempt was unsuccessful.",
        description: errorMessage,
        duration: 3000,
      });
      console.error("Register error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegisterSubmit)}>
      <Stack
        align="flex-start"
        maxW="lg"
        width={"lg"}
        rounded="lg"
        pointerEvents={isResendCodeModalOpen ? "none" : "auto"}
      >
        <Fieldset.Root
          size="lg"
          position={"absolute"}
          width="25rem"
          mx={{ base: "0px", lg: "auto" }}
          my={{ base: "0px", lg: "auto" }}
          bgColor={{ base: "gray.100", _dark: "#1d2739" }}
          p={5}
          translate={"-50% -50%"}
          left={"50%"}
          top={"50%"}
          rounded="md"
          height={{ base: "auto", md: "auto" }}
        >
          <Stack pb="10px">
            <Fieldset.Legend
              color="blue.500"
              fontWeight={"bold"}
              fontSize={{ base: "1.5rem", lg: "2.5rem" }}
              py={4}
            >
              🔐 Register...
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide new user details below.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <SimpleGrid
              columns={{ base: 1 }}
              mt={4}
              gap={{ base: "2", md: "4" }}
              //   border="1px dashed yellow"
            >
              <ModalFormInput<FormValues>
                name="name"
                label="name"
                register={register}
                error={errors?.name}
              />
              <ModalFormInput<FormValues>
                name="email"
                label="Email"
                type="email"
                register={register}
                error={errors?.email}
              />
              <ModalFormInput<FormValues>
                name="password"
                type="password"
                label="Password"
                register={register}
                error={errors?.password}
              />
              <ModalFormInput<FormValues>
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                register={register}
                error={errors?.confirmPassword}
              />
            </SimpleGrid>
          </Fieldset.Content>
          <Flex width="100%" direction="column" gap={3} pt="1rem">
            <Button
              onClick={() => console.log("register form submit clicked")}
              type="submit"
              //   width="100%"
              //   width={{
              //     base: "100%",
              //     sm: "40%",
              //   }}
              colorPalette="teal"
              rounded="full"
              // loading={createProject.isPending}
              // loadingText="Submitting"
            >
              Submit
            </Button>
          </Flex>
          <Flex
            gap="4"
            fontSize="0.8rem"
            py="5px"
            color={{ base: "gray.600", _dark: "gray.300" }}
            align="center"
          >
            <Text fontSize="inherit" py="inherit" color="inherit">
              Already have an account? {""}
              <Link href="/login">
                <Box
                  as="span"
                  _hover={{ cursor: "pointer", color: "blue.500" }}
                >
                  Login
                </Box>
              </Link>
            </Text>
            <Button
              asChild
              variant="plain"
              size="xs"
              fontSize="inherit"
              p="0"
              py="5px"
              color="inherit"
              _hover={{ cursor: "default" }}
            >
              <Link href="/resend-code">
                Resend
                <Box
                  as="span"
                  _hover={{ cursor: "pointer", color: "teal.500" }}
                >
                  Code
                </Box>
              </Link>
            </Button>
          </Flex>
        </Fieldset.Root>
      </Stack>
    </form>
  );
}

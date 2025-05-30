"use client";

import React from "react";
import ModalFormInput from "../../components/modals/ModalFormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

// $ Chakra Components
import {
  Button,
  Fieldset,
  Flex,
  Stack,
  Box,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

// $ React-Hook-Form, zod & schema
import { loginSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// $ Function handling the signin to aws
import { awsCognitoLogin } from "@/app/utils/aws-signin";
import { fetchUserAttributes } from "aws-amplify/auth";

type FormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { userAttributes, setUserAttributes } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLoginSubmit = async (data: FormValues) => {
    // $ try-catch to sign into aws cognito
    try {
      //$ awsLogin is the function handling the signin to aws cognito using amplify "/utils/aws-login.ts"
      const result = await awsCognitoLogin(data.email, data.password);
      // $ assign the user attributes to the global state to use where required
      if (!result) {
        toaster.create({
          type: "error",
          title: "Error!!",
          description: "The login attempt was unsuccessful",
          duration: 3000,
        });
        return; // prevent going forward if login fails
      } else {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
        router.push("/dashboard");
        // console.log("attributes", attributes);
        toaster.create({
          type: "success",
          title: "signing in...",
          description: `Welcome Back ${attributes?.name}`,
          duration: 3000,
        });
        console.log("user attributes in the state:", userAttributes);
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
        title: "The login attempt was unsuccessful.",
        description: errorMessage,
        duration: 3000,
      });
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLoginSubmit)}>
      <Stack align="flex-start" maxW="lg" width={"lg"} rounded="lg">
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
              🔐 Login...
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide login details below.
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
                name="email"
                label="Email"
                type="email"
                register={register}
                error={errors?.email}
              />
              <ModalFormInput<FormValues>
                name="password"
                label="Password"
                register={register}
                error={errors?.password}
              />
            </SimpleGrid>
          </Fieldset.Content>
          <Flex width="100%" direction="column" gap={3} pt="0.5rem">
            <Text
              fontSize="0.8rem"
              color={{ base: "gray.600", _dark: "gray.300" }}
            >
              <Link href="/register">
                <Box as="span">Forgot password?</Box>
              </Link>
            </Text>

            <Button
              type="submit"
              //   width="100%"
              //   width={{
              //     base: "100%",
              //     sm: "40%",
              //   }}
              colorPalette="teal"
              rounded="full"
              // loading={createProject.isPending}
              loadingText="Submitting"
            >
              Submit
            </Button>
          </Flex>
          <Text
            fontSize="0.8rem"
            py="1rem"
            color={{ base: "gray.600", _dark: "gray.300" }}
          >
            Don’t have an account?{" "}
            <Link href="/register">
              <Box as="span" _hover={{ color: "blue.400" }}>
                Sign up
              </Box>
            </Link>
          </Text>
        </Fieldset.Root>
      </Stack>
    </form>
  );
}

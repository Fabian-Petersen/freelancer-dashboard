"use client";

// $ - This form is used to authenticate the user's email address and validate the input. The form can also be used to resend a verification code to the users email address.

// $ - The Form is rendered in the confirm-signup page.

import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

import ModalFormInput from "@/app/components/modals/ModalFormInput";
import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

import { ConfirmSignUp } from "@/app/utils/aws-confirm-signup";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

type FormValues = z.infer<typeof confirmSignUpSchema>;

// $ React-Hook-Form, zod & schema
import { confirmSignUpSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ConfirmSignUpForm = () => {
  // $ State from UseContext
  const {
    // setIsConfirmSignUpModalOpen,
    // signUpEmail,
    formSubmitting,
    setFormSubmitting,
    setSignUpEmail,
  } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(confirmSignUpSchema),
  });

  const router = useRouter();

  // $ aws amplify cognito signin logic
  // const params = useSearchParams();

  const handleConfirmSignUp = async (formData: FormValues) => {
    // $ Get the user email to verify the account
    const getStoredEmail = JSON.parse(
      sessionStorage.getItem("formData") || "{}"
    );
    const code = formData.code;
    setFormSubmitting(true);
    try {
      if (!code) {
        throw new Error("Please provide a confirmation code");
      }
      console.log("confirm signup code:", formData);

      const email = getStoredEmail.email as string;

      if (!email) {
        throw new Error("Username is required");
      }

      console.log("email:", email);
      console.log("code:", code);
      const result = ConfirmSignUp(email, code);

      if (!result) {
        console.log("registration failed");
        // Show success toast
      } else {
        router.push("/login");
        toaster.create({
          type: "success",
          title: "Success!!",
          description: "Your email was successfully verified",
          duration: 3000,
        });
        setSignUpEmail("");
        // Show error toast with result.message
      }
    } catch (err) {
      console.log("error registering email", err);
    } finally {
      setFormSubmitting(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleConfirmSignUp)}>
      <Stack gap="4" align="flex-start" maxW="lg" width={"lg"} rounded="lg">
        <Fieldset.Root
          size="lg"
          position={"absolute"}
          maxW="2xl"
          mx={"auto"}
          my={"auto"}
          bgColor={{ base: "white", _dark: "#1d2739" }}
          p={6}
          translate={"-50% -50%"}
          left={"50%"}
          top={"50%"}
          rounded="md"
          backdropBlur={"xl"}
        >
          <Stack>
            <Fieldset.Legend
              color="blue.500"
              fontWeight={"bold"}
              fontSize={{ base: "1rem", lg: "1.5rem" }}
            >
              Confirm Sign Up
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please enter the email verification code below.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <SimpleGrid columns={{ base: 1, md: 2 }} mt={4} gap={4}>
              <ModalFormInput<FormValues>
                name="code"
                label="Enter Code"
                register={register}
                error={errors?.code}
              />
            </SimpleGrid>
          </Fieldset.Content>

          <Flex gap={4} mt={2} direction={{ base: "column", lg: "row" }}>
            <Button
              type="button"
              alignSelf="flex-start"
              width={{
                base: "100%",
                lg: "8rem",
              }}
              mt={4}
              variant="outline"
              rounded="full"
              colorPalette="yellow"
              color={{ base: "gray.600", _dark: "gray.200" }}
              _hover={{ bgColor: "red.300", color: "white" }}
              onClick={() => {
                router.push("/");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              alignSelf="flex-start"
              width={{
                base: "100%",
                lg: "8rem",
              }}
              mt={4}
              colorPalette="teal"
              rounded="full"
              loading={formSubmitting}
              loadingText="Registering..."
            >
              Confirm Email
            </Button>
          </Flex>
        </Fieldset.Root>
      </Stack>
    </form>
  );
};

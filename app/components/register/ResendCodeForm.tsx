"use client";

// $ - This form is used to authenticate the user's email address and validate the input. The form can also be used to resend a verification code to the users email address.

// $ - The Form is rendered in the confirm-signup page.

import ModalFormInput from "@/app/components/modals/ModalFormInput";
import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

import { resendConfirmationCode } from "@/app/utils/aws-confirm-signup";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof resendCodeSchema>;

// $ React-Hook-Form, zod & schema
import { resendCodeSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const ResendCodeForm = () => {
  // $ State from UseContext
  const {
    // setIsConfirmSignUpModalOpen,
    signUpEmail,
    setSignUpEmail,
    formSubmitting,
    setFormSubmitting,
    // setIsResendCodeModalOpen,
  } = useGlobalContext();

  const router = useRouter();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(resendCodeSchema),
  });

  const storeEmail = (formData: FormValues) => {
    sessionStorage.setItem("formData", JSON.stringify(formData));
  };

  const handleResendCode = async (formData: FormValues) => {
    storeEmail(formData);
    setSignUpEmail(formData.email);
    console.log(signUpEmail);
    setFormSubmitting(true);
    try {
      console.log("resend-code-form:", signUpEmail);
      const result = await resendConfirmationCode(signUpEmail);
      if (result.success) {
        console.log("There was an error resending email");
        toaster.create({
          type: "success",
          title: "Success!!",
          description: "Check your email for the new verification code",
          duration: 3000,
        });
        router.push("/confirm-signup");
      } else {
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFormSubmitting(false);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleResendCode)}>
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
              Resend Verification Code
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please enter the email address.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <SimpleGrid columns={{ base: 1, md: 2 }} mt={4} gap={4}>
              <ModalFormInput<FormValues>
                name="email"
                label="Enter Email Address"
                register={register}
                error={errors?.email}
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
              onClick={() => router.push("/")}
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
              loadingText="Requesting..."
            >
              Resend Code
            </Button>
          </Flex>
        </Fieldset.Root>
      </Stack>
    </form>
  );
};

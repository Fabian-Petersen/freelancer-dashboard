"use client";

// $ - This form is used to authenticate the user's email address and validate the input. The form can also be used to resend a verification code to the users email address.

// $ - The Form is rendered in the confirm-signup page.

import ModalFormInput from "@/app/components/modals/ModalFormInput";
// import { toaster } from "@/components/ui/toaster";
import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";

// import ResendCodeButton from "./ResendCodeButton";
// import { awsCognitoConfirmRegistration } from "@/app/utils/confirmRegistration";
// import { useSearchParams } from "next/navigation";
// import { useGlobalContext } from "@/app/contexts/useGlobalContext";

type FormValues = z.infer<typeof confirmSignUpSchema>;

// $ React-Hook-Form, zod & schema
import { confirmSignUpSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ConfirmRegistrationForm = () => {
  // $ State from UseContext
  // const { setIsConfirmSignUpModalOpen } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(confirmSignUpSchema),
  });

  // const [code, setCode] = useState("");
  // const router = useRouter();

  // $ aws amplify cognito signin logic
  // const params = useSearchParams();
  // const email = params.get("email");

  const handleConfirmSignUp = async (formData: FormValues) => {
    console.log("confirm signup code:", formData);
    // try {
    //   if (!code) {
    //     throw new Error("Please provide a confirmation code");
    //   }

    //   if (!email) {
    //     throw new Error("Username is required");
    //   }
    //   const confirmSignUp = awsCognitoConfirmRegistration(email, code);

    //   if (!confirmSignUp) {
    //     console.log("Error Signing Up");
    //   }

    //   setTimeout(() => {
    //     router.push("/login");
    //   }, 2000);
    // } catch (err) {
    //   console.log("error registering email", err);
    // }
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
              Update Project Details
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide project details below.
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
                // setIsSignUpModalOpen(false);
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
              // loading={updateProject.isPending}
              // loadingText="Updating"
            >
              Confirm Email
            </Button>
          </Flex>
        </Fieldset.Root>
      </Stack>
    </form>
  );
};

export default ConfirmRegistrationForm;

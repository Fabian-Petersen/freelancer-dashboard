"use client";
import { useState } from "react";
// import { toaster } from "@/components/ui/toaster";
import { JobApplicationProps } from "../charts/ApplicationCards";

import {
  Container,
  Button,
  Field,
  Fieldset,
  //   For,
  Input,
  Flex,
  //   NativeSelect,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useUpdate } from "../../hooks/useFetchDataHook";

type UpdateProjectModalProps = {
  application: JobApplicationProps;
};

const UpdateApplicationModal = ({ application }: UpdateProjectModalProps) => {
  const { setIsUpdateApplicationOpen, isUpdateApplicationOpen } =
    useGlobalContext();

  const updateProject = useUpdate("projects");

  const [applicationForm, setApplicationForm] =
    useState<JobApplicationProps>(application);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;

    setApplicationForm((prev) => ({
      ...prev,
      name: value,
    }));
  };

  //   const handleProjectSubmit = async () => {
  //     const promise = new Promise<void>((resolve) => {
  //       setTimeout(() => resolve(), 5000);
  //     });

  //     try {
  //       await updateProject.mutateAsync({
  //         id: applicationForm.id || "",
  //         applicationForm: { ...applicationForm },
  //       });
  //       toaster.promise(promise, {
  //         success: {
  //           title: "new application",
  //           description: "JobApplicationProps Successfully Created",
  //         },
  //         error: {
  //           title: "Upload failed",
  //           description: "Something wrong with the upload",
  //         },
  //         loading: { title: "Uploading...", description: "Please wait" },
  //       });

  //       // Close the modal and reset form
  //       setIsUpdateApplicationOpen(false);
  //       setApplicationForm({
  //         id: "",
  //         client: "",
  //         name: "",
  //         description: "",
  //         price: 0,
  //         deadline: "",
  //         email: "",
  //         phone: "",
  //         // country: "",
  //         status: ['applied'],
  //       });
  //     } catch (error) {
  //       toaster.create({
  //         title: "error",
  //         description: "An error occured creating new application",
  //         type: "error",
  //       });
  //       console.error("Error creating application:", error);
  //     }
  //   };

  return (
    <Container
      position={"absolute"}
      width={"100%"}
      height={"100vh"}
      display={isUpdateApplicationOpen ? "block" : "none"}
      top="0"
      left="0"
      p={4}
      backdropBlur={"sm"}
      mx={"auto"}
      bgColor="black/60"
      zIndex={2000}
    >
      <Fieldset.Root
        size="lg"
        position={"absolute"}
        maxW="2xl"
        mx={"auto"}
        my={"auto"}
        bg="white"
        p={6}
        translate={"-50% -50%"}
        left={"50%"}
        top={"50%"}
        rounded="md"
      >
        <Stack>
          <Fieldset.Legend
            color="blue.500"
            fontWeight={"bold"}
            fontSize={{ base: "lg", lg: "xl" }}
          >
            Update Applciation Details
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Please edit the details below.
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <SimpleGrid columns={2} mt={4} gap={4}>
            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Input
                name="description"
                px="0.5rem"
                onChange={handleInputChange}
                value={applicationForm.description}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Location</Field.Label>
              <Input
                name="location"
                px="0.5rem"
                onChange={handleInputChange}
                value={applicationForm.location}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Status</Field.Label>
              <Input
                name="status"
                px="0.5rem"
                onChange={handleInputChange}
                value={applicationForm.status}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Company</Field.Label>
              <Input
                name="company"
                px="0.5rem"
                onChange={handleInputChange}
                value={applicationForm.company}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Date Applied</Field.Label>
              <Input
                name="date_applied"
                type="date"
                px="0.5rem"
                onChange={handleInputChange}
                value={applicationForm.date_applied}
              />
            </Field.Root>
          </SimpleGrid>
        </Fieldset.Content>
        <Flex gap={4} mt={2} direction={{ base: "column", lg: "row" }}>
          <Button
            type="submit"
            alignSelf="flex-start"
            width={{
              base: "100%",
              lg: "8rem",
            }}
            mt={4}
            variant="outline"
            rounded="full"
            colorPalette="red"
            onClick={() => {
              setIsUpdateApplicationOpen(false);
            }}
            disabled={updateProject.isPending}
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
            onClick={() => {
              console.log("submit application");
            }}
            // loading={updateProject.isPending}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </Flex>
      </Fieldset.Root>
    </Container>
  );
};

export default UpdateApplicationModal;

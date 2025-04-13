"use client";

import { toaster } from "@/components/ui/toaster";
import ModalFormInput from "./ModalFormInput";

// $ Chakra Components
import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";

// $ React-Hook-Form, zod & schema
import { projectSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type FormValues = z.infer<typeof projectSchema>;

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useCreate } from "../../hooks/useFetchDataHook";

const NewProjectModal = () => {
  const { setIsNewProjectModalOpen } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
  });

  const createProject = useCreate("projects");
  const handleProjectSubmit = async (formData: FormValues) => {
    console.log("RHF FormData:", formData);
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });

    try {
      await createProject.mutateAsync(formData);
      toaster.promise(promise, {
        success: {
          title: "New Project",
          description: "Project Successfully Created",
        },
        error: {
          title: "Upload failed",
          description: "Something wrong with the upload",
        },
        loading: { title: "Uploading...", description: "Please wait" },
      });

      // $ Close the modal and reset form
      setIsNewProjectModalOpen(false);
      reset();
      // $ Uncomment when POST method is working to reset the input fields
    } catch (error) {
      toaster.create({
        title: "Error!!",
        description: "An error occured creating new project",
        type: "error",
      });
      console.error("Error creating project:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleProjectSubmit)}>
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
        >
          <Stack>
            <Fieldset.Legend
              color="blue.500"
              fontWeight={"bold"}
              fontSize={{ base: "1rem", lg: "1.5rem" }}
            >
              New Project Details
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide project details below.
            </Fieldset.HelperText>
          </Stack>
          <Fieldset.Content>
            <SimpleGrid columns={{ base: 1, md: 2 }} mt={4} gap={4}>
              <ModalFormInput<FormValues>
                name="client"
                label="Client"
                register={register}
                error={errors?.client}
              />
              <ModalFormInput<FormValues>
                name="name"
                label="Project Name"
                register={register}
                error={errors?.name}
              />
              <ModalFormInput<FormValues>
                name="description"
                label="Project Description"
                register={register}
                error={errors?.description}
              />
              <ModalFormInput<FormValues>
                name="price"
                label="Project Budget"
                type="number"
                register={register}
                error={errors?.price}
              />
              <ModalFormInput<FormValues>
                name="deadline"
                label="Deadline"
                type="date"
                register={register}
                error={errors?.deadline}
              />
              <ModalFormInput<FormValues>
                name="email"
                label="Email"
                type="email"
                register={register}
                error={errors?.email}
              />
              <ModalFormInput<FormValues>
                name="phone"
                type="tel"
                label="Contact Number"
                register={register}
                error={errors?.phone}
              />
              <ModalFormInput<FormValues>
                name="status"
                type="number"
                label="Project Status"
                register={register}
                error={errors?.status}
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
                setIsNewProjectModalOpen(false);
              }}
              disabled={createProject.isPending}
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
              loading={createProject.isPending}
              loadingText="Submitting"
            >
              Submit
            </Button>
          </Flex>
        </Fieldset.Root>
      </Stack>
    </form>
  );
};

export default NewProjectModal;

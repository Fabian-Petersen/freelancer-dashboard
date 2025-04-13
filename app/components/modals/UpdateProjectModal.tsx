"use client";
import { toaster } from "@/components/ui/toaster";
import { useEffect } from "react";

import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";

import ModalFormInput from "./ModalFormInput";

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useUpdate } from "../../hooks/useFetchDataHook";

type FormValues = z.infer<typeof projectSchema>;

// $ React-Hook-Form, zod & schema
import { projectSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UpdateProjectModal = () => {
  const {
    setIsUpdateProjectModalOpen,
    isUpdateProjectModalOpen,
    selectedProject,
    setSelectedProject,
  } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: selectedProject
      ? {
          client: selectedProject.client,
          name: selectedProject.name,
          id: selectedProject.id,
          description: selectedProject.description,
          price: selectedProject.price,
          deadline: new Date(selectedProject.deadline), // Ensure date format is correct
          email: selectedProject.email,
          phone: selectedProject.phone,
          status: selectedProject.status,
        }
      : undefined,
  });

  // Reset the form when project changes
  useEffect(() => {
    if (selectedProject) {
      reset({
        client: selectedProject.client,
        name: selectedProject.name,
        id: selectedProject.id,
        description: selectedProject.description,
        price: selectedProject.price,
        deadline: new Date(selectedProject.deadline), // Ensure date format is correct
        email: selectedProject.email,
        phone: selectedProject.phone,
        status: selectedProject.status,
      });
    }
  }, [selectedProject, reset]);

  const updateProject = useUpdate<FormValues>("projects");

  // Function to handle form submission
  const onSubmit = async (formData: FormValues) => {
    if (!formData.id) {
      toaster.create({
        title: "Error",
        description: "Project ID is missing.",
        type: "error",
      });
      return;
    }

    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });

    try {
      await updateProject.mutateAsync({
        id: formData.id,
        entity: formData,
      });

      toaster.promise(promise, {
        success: {
          title: "Project Updated",
          description: "Project Successfully Updated",
        },
        error: {
          title: "Update failed",
          description: "Something went wrong with the update",
        },
        loading: { title: "Updating...", description: "Please wait" },
      });

      // Close the modal after successful update
      setIsUpdateProjectModalOpen(false);
      // Reset the selected project
      setSelectedProject(null);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "An error occurred updating project",
        type: "error",
      });
      console.error("Error updating project:", error);
    }
  };

  // Don't render the modal if no project is selected
  if (!selectedProject && isUpdateProjectModalOpen) {
    return null;
  }

  console.log("open modal, modal component:", isUpdateProjectModalOpen);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                setIsUpdateProjectModalOpen(false);
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
              loading={updateProject.isPending}
              loadingText="Updating"
            >
              Update
            </Button>
          </Flex>
        </Fieldset.Root>
      </Stack>
    </form>
  );
};

export default UpdateProjectModal;

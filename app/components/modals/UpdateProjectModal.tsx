"use client";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";

import {
  Container,
  Button,
  Field,
  Fieldset,
  Input,
  Flex,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useUpdate } from "../../hooks/useFetchDataHook";
import { Project } from "@/types/project";

type UpdateProjectModalProps = {
  project: Project;
};

const UpdateProjectModal = ({ project }: UpdateProjectModalProps) => {
  const {
    setIsUpdateProjectModalOpen,
    setSelectedProject,
    isUpdateProjectModalOpen,
  } = useGlobalContext();

  const [projectForm, setProjectForm] = useState<Project>(project);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateProject = useUpdate("projects");
  const handleUpdateProject = async (id: string, entity: Partial<Project>) => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });
    try {
      await updateProject.mutateAsync({ id, entity });
      // Success handling (optional) - could show a toast notification
      toaster.promise(promise, {
        success: {
          title: "new project",
          description: "Project Successfully Created",
        },
        error: {
          title: "Upload failed",
          description: "Something wrong with the upload",
        },
        loading: { title: "Uploading...", description: "Please wait" },
      });

      // Close the modal and reset form
      setIsUpdateProjectModalOpen(false);
      setProjectForm({
        id: "",
        client: "",
        name: "",
        description: "",
        price: 0,
        deadline: "",
        email: "",
        phone: "",
        status: 0,
      });
    } catch (error) {
      toaster.create({
        title: "error",
        description: "An error occured updating project",
        type: "error",
      });
      console.error("Error creating project:", error);
    }
    setSelectedProject(project);
  };

  console.log("open modal, modal component:", isUpdateProjectModalOpen);

  return (
    <Container
      position={"absolute"}
      display={isUpdateProjectModalOpen ? "block" : "none"}
      width={"100%"}
      height={"100vh"}
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
            Update Project Details
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide project details below.
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content>
          <SimpleGrid columns={2} mt={4} gap={4}>
            <Field.Root>
              <Field.Label>Client</Field.Label>
              <Input
                name="client"
                px="0.5rem"
                onChange={handleInputChange}
                value={projectForm.client}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Project Name</Field.Label>
              <Input
                name="name"
                px="0.5rem"
                onChange={handleInputChange}
                value={projectForm.name}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Project Description</Field.Label>
              <Input
                name="description"
                px="0.5rem"
                onChange={handleInputChange}
                value={projectForm.description}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Price</Field.Label>
              <Input
                name="price"
                px="0.5rem"
                onChange={handleInputChange}
                value={projectForm.price}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Deadline</Field.Label>
              <Input
                name="deadline"
                type="date"
                px="0.5rem"
                onChange={handleInputChange}
                value={projectForm.deadline}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Email address</Field.Label>
              <Input
                name="email"
                type="email"
                px="0.5rem"
                onChange={handleInputChange}
                value={projectForm.email}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Phone number</Field.Label>
              <Input
                name="phone"
                type="tel"
                px="0.5rem"
                onChange={handleInputChange}
                value={projectForm.phone}
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
            onClick={() => {
              if (projectForm.id) {
                handleUpdateProject(projectForm.id, projectForm);
              } else {
                toaster.create({
                  title: "Error",
                  description: "Project ID is missing.",
                  type: "error",
                });
              }
            }}
            loading={updateProject.isPending}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </Flex>
      </Fieldset.Root>
    </Container>
  );
};

export default UpdateProjectModal;

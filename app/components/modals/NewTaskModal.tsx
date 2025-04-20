"use client";
import { toaster } from "@/components/ui/toaster";
import ModalFormInput from "./ModalFormInput";

// $ Chakra Components
import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";

// $ React-Hook-Form, zod & schema
import { taskSchema } from "@/app/schemas";
import { Task } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type FormValues = Task;

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useCreate } from "../../hooks/useFetchDataHook";

const NewApplicationModal = () => {
  const { setIsNewTaskModalOpen } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(taskSchema),
  });

  // $ State to open the modal to add a new project
  const createTask = useCreate("tasks");
  const handleTaskSubmit = async (formData: FormValues) => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 2000);
    });

    try {
      await createTask.mutateAsync(formData);
      toaster.promise(promise, {
        success: {
          title: "New Task",
          description: "Task Successfully Created",
        },
        error: {
          title: "Upload Failed",
          description: "Something wrong with the upload",
        },
        loading: { title: "Uploading...", description: "Please wait" },
      });
      // $ Close the modal and reset form
      setIsNewTaskModalOpen(false);
      reset();
    } catch (error) {
      toaster.create({
        title: "Error!!",
        description: "An error occured creating new task",
        type: "error",
      });
      console.error("Error creating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleTaskSubmit)}>
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
              New Task Details
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please enter the details below.
            </Fieldset.HelperText>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 2 }} mt={4} gap={4}>
            <ModalFormInput<FormValues>
              name="task_title"
              label="Task Title"
              register={register}
              error={errors?.task_title}
            />
            <ModalFormInput<FormValues>
              name="description"
              type="textarea"
              label="description"
              register={register}
              error={errors?.description}
            />
            <ModalFormInput<FormValues>
              name="priority"
              label="Priority"
              register={register}
              error={errors?.priority}
            />
            <ModalFormInput<FormValues>
              name="status"
              label="Status"
              register={register}
              error={errors?.status}
            />
            <ModalFormInput<FormValues>
              name="due_date"
              label="Due Date"
              type="date"
              register={register}
              error={errors.due_date}
            />
          </SimpleGrid>
          <Flex gap={4} mt={2} direction={{ base: "column", lg: "row" }}>
            <Button
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
                setIsNewTaskModalOpen(false);
              }}
              disabled={createTask.isPending}
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
              loading={createTask.isPending}
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

export default NewApplicationModal;

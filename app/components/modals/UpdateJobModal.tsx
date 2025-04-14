"use job_title";
import { useEffect } from "react";

// $ Chakra UI Components
import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import ModalFormInput from "./ModalFormInput";

// $ components
// import SelectInput from "./SelectInput";

// $ functions
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useUpdate } from "../../hooks/useFetchDataHook";

// $ types
import { jobSchema } from "@/app/schemas";
type FormValues = z.infer<typeof jobSchema>;

// $ React-Hook-Form, zod & schema
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UpdateJobModal = () => {
  const {
    setIsUpdateJobModalOpen,
    isUpdateJobModalOpen,
    selectedJob,
    setSelectedJob,
  } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: selectedJob
      ? {
          job_title: selectedJob.job_title,
          company: selectedJob.company,
          city: selectedJob.city,
          date_applied: new Date(selectedJob.date_applied),
          location_type: selectedJob.location_type,
          status: selectedJob.status,
          contract: selectedJob.contract,
          id: selectedJob.id,
        }
      : undefined,
  });

  // Reset the form when project changes
  useEffect(() => {
    if (selectedJob) {
      reset({
        job_title: selectedJob.job_title,
        company: selectedJob.company,
        id: selectedJob.id,
        city: selectedJob.city,
        date_applied: new Date(selectedJob.date_applied),
        location_type: selectedJob.location_type,
        status: selectedJob.status,
        contract: selectedJob.contract,
      });
    }
  }, [selectedJob, reset]);

  // Use the update hook for applications (not projects)
  const updateJob = useUpdate<FormValues>("applications");

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
      setTimeout(() => resolve(), 500);
    });

    try {
      await updateJob.mutateAsync({
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
      setIsUpdateJobModalOpen(false);
      // Reset the selected project
      setSelectedJob(null);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "An error occurred updating project",
        type: "error",
      });
      console.error("Error updating project:", error);
    }
  };

  // Don't render the modal if no Job is selected
  if (!selectedJob && isUpdateJobModalOpen) {
    return null;
  }

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
              fontWeight="bold"
              fontSize={{ base: "1rem", lg: "1.5rem" }}
            >
              Update Job Application
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please edit the application details below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <SimpleGrid columns={{ base: 1, md: 2 }} mt={4} gap={4}>
              <ModalFormInput<FormValues>
                name="job_title"
                label="Job Title"
                register={register}
                error={errors?.job_title}
              />
              <ModalFormInput<FormValues>
                name="company"
                label="company"
                register={register}
                error={errors?.company}
              />
              <ModalFormInput<FormValues>
                name="contract"
                label="Contract Type"
                register={register}
                error={errors?.contract}
              />
              <ModalFormInput<FormValues>
                name="city"
                label="City"
                register={register}
                error={errors?.city}
              />
              <ModalFormInput<FormValues>
                name="location_type"
                label="location"
                register={register}
                error={errors?.location_type}
              />
              <ModalFormInput<FormValues>
                name="status"
                label="status"
                register={register}
                error={errors?.status}
              />
              <ModalFormInput<FormValues>
                name="date_applied"
                label="Date Applied"
                type="date"
                register={register}
                error={errors.date_applied}
              />
            </SimpleGrid>
          </Fieldset.Content>

          <Flex gap={4} mt={2} direction={{ base: "column", lg: "row" }}>
            <Button
              type="button"
              alignSelf="flex-start"
              width={{ base: "100%", lg: "8rem" }}
              mt={4}
              variant="outline"
              colorPalette="yellow"
              rounded="full"
              color={{ base: "gray.600", _dark: "gray.200" }}
              _hover={{ bgColor: "red.300", color: "white" }}
              onClick={() => setIsUpdateJobModalOpen(false)}
              disabled={updateJob.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              alignSelf="flex-start"
              width={{ base: "100%", lg: "8rem" }}
              mt={4}
              colorPalette="teal"
              rounded="full"
              loading={updateJob.isPending}
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
export default UpdateJobModal;

"use client";
import { useState, useEffect } from "react";
// $ Chakra UI Components
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
import { toaster } from "@/components/ui/toaster";

// $ components
import SelectInput from "./SelectInput";

// $ functions
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useUpdate } from "../../hooks/useFetchDataHook";

// $ types
import { Job } from "@/types/job";
type UpdateJobModalProps = {
  application: Job;
};

// $ data
import { status } from "@/public/data/selectInputData";
import { location_type } from "@/public/data/selectInputData";
import { contract } from "@/public/data/selectInputData";

const UpdateJobModal = ({ application }: UpdateJobModalProps) => {
  const { setIsUpdateJobModalOpen, isUpdateJobModalOpen } = useGlobalContext();

  // Use the update hook for applications (not projects)
  const updateJob = useUpdate<Job>("applications");

  // Initialize form state with the application data
  const [jobForm, setJobForm] = useState<Job>(application);

  // Update the form when the application prop changes
  useEffect(() => {
    if (application) {
      setJobForm(application);
    }
  }, [application]);

  // Handle input change for all form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setJobForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!jobForm.id) {
      toaster.create({
        title: "Error",
        description: "Job ID is missing",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      await updateJob.mutateAsync({
        id: jobForm.id,
        entity: jobForm,
      });
      console.log(jobForm);
      toaster.create({
        title: "Success",
        description: "Job application updated successfully",
        type: "success",
        duration: 3000,
      });

      // Close the modal
      setIsUpdateJobModalOpen(false);
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to update job application",
        type: "error",
        duration: 3000,
      });
      console.error("Error updating job:", error);
    }
  };

  return (
    <Container
      position="fixed"
      width="100%"
      height="100vh"
      display={isUpdateJobModalOpen ? "block" : "none"}
      top="0"
      left="0"
      p={4}
      backdropFilter="blur(4px)"
      mx="auto"
      bgColor="rgba(0,0,0,0.6)"
      zIndex={2000}
    >
      <Fieldset.Root
        size="lg"
        position="absolute"
        maxW="2xl"
        mx="auto"
        my="auto"
        bg="white"
        p={6}
        transform="translate(-50%, -50%)"
        left="50%"
        top="50%"
        rounded="md"
      >
        <Stack>
          <Fieldset.Legend
            color="blue.500"
            fontWeight="bold"
            fontSize={{ base: "lg", lg: "xl" }}
          >
            Update Job Application
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Please edit the application details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <SimpleGrid columns={{ base: 1, md: 2 }} mt={4} gap={4}>
            <Field.Root>
              <Field.Label>Job Title</Field.Label>
              <Input
                name="description"
                px="0.5rem"
                onChange={handleInputChange}
                value={jobForm.job_title || ""}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Company</Field.Label>
              <Input
                name="company"
                px="0.5rem"
                onChange={handleInputChange}
                value={jobForm.company || ""}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Location Setting</Field.Label>
              <SelectInput
                items={location_type}
                value={jobForm.location_type}
                onChange={(val) => {
                  setJobForm((prev) => ({
                    ...prev,
                    location_type: val as Job["location_type"],
                  }));
                }}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Location</Field.Label>
              <Input
                name="location"
                px="0.5rem"
                onChange={handleInputChange}
                value={jobForm.city || ""}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Date Applied</Field.Label>
              <Input
                name="date_applied"
                type="date"
                px="0.5rem"
                onChange={handleInputChange}
                value={jobForm.date_applied || ""}
              />
            </Field.Root>
            <Field.Root>
              <Field.Label>Status</Field.Label>
              <SelectInput
                items={status}
                value={jobForm.status}
                onChange={(val) => {
                  setJobForm((prev) => ({
                    ...prev,
                    status: val as Job["status"],
                  }));
                }}
              />
            </Field.Root>

            {/* Job Details - Second item */}
            <Field.Root>
              <Field.Label>Contract Type</Field.Label>
              <SelectInput
                items={contract}
                value={jobForm.contract}
                onChange={(val) => {
                  setJobForm((prev) => ({
                    ...prev,
                    contract: val as Job["contract"],
                  }));
                }}
              />
            </Field.Root>
          </SimpleGrid>
        </Fieldset.Content>

        <Flex gap={4} mt={2} direction={{ base: "column", lg: "row" }}>
          <Button
            type="button"
            alignSelf="flex-start"
            width={{ base: "100%", lg: "8rem" }}
            mt={4}
            variant="outline"
            rounded="full"
            colorPalette="red"
            onClick={() => setIsUpdateJobModalOpen(false)}
            // isDisabled={updateJob.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            alignSelf="flex-start"
            width={{ base: "100%", lg: "8rem" }}
            mt={4}
            colorPalette="teal"
            rounded="full"
            onClick={handleSubmit}
            // isPending={updateJob.isPending}
            loadingText="Updating"
          >
            Update
          </Button>
        </Flex>
      </Fieldset.Root>
    </Container>
  );
};

export default UpdateJobModal;

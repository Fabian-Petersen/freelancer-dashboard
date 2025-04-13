"use client";
import { useState, useEffect } from "react";
// $ Chakra UI Components
import {
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
  const { setIsUpdateJobModalOpen } = useGlobalContext();

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
    <Fieldset.Root
      size="lg"
      position="absolute"
      maxW="2xl"
      mx="auto"
      my="auto"
      bgColor={{ base: "white", _dark: "#1d2739" }}
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
          <Field.Root>
            <Field.Label color={{ base: "gray.700", _dark: "gray.50/60" }}>
              Job Title
            </Field.Label>
            <Input
              name="description"
              px="0.5rem"
              onChange={handleInputChange}
              value={jobForm.job_title || ""}
              borderColor={{ base: "gray.400/40", _dark: "gray.500/50" }}
              color={{ base: "gray.700", _dark: "gray.50/60" }}
              _placeholder={{ color: "inherit" }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label color={{ base: "gray.700", _dark: "gray.50/60" }}>
              Company
            </Field.Label>
            <Input
              name="company"
              px="0.5rem"
              onChange={handleInputChange}
              value={jobForm.company || ""}
              borderColor={{ base: "gray.400/40", _dark: "gray.500/50" }}
              color={{ base: "gray.700", _dark: "gray.50/60" }}
              _placeholder={{ color: "inherit" }}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label color={{ base: "gray.700", _dark: "gray.50/60" }}>
              Location Setting
            </Field.Label>
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
            <Field.Label color={{ base: "gray.700", _dark: "gray.50/60" }}>
              Location
            </Field.Label>
            <Input
              borderColor={{ base: "gray.400/40", _dark: "gray.500/50" }}
              color={{ base: "gray.700", _dark: "gray.50/60" }}
              _placeholder={{ color: "inherit" }}
              name="location"
              px="0.5rem"
              onChange={handleInputChange}
              value={jobForm.city || ""}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label color={{ base: "gray.700", _dark: "gray.50/60" }}>
              Date Applied
            </Field.Label>
            <Input
              name="date_applied"
              type="date"
              px="0.5rem"
              onChange={handleInputChange}
              value={jobForm.date_applied || ""}
              borderColor={{ base: "gray.400/40", _dark: "gray.500/50" }}
              color={{ base: "gray.700", _dark: "gray.50/60" }}
              _placeholder={{ color: "inherit" }}
            />
          </Field.Root>
          <Field.Root>
            <Field.Label color={{ base: "gray.700", _dark: "gray.50/60" }}>
              Status
            </Field.Label>
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
            <Field.Label color={{ base: "gray.700", _dark: "gray.50/60" }}>
              Contract Type
            </Field.Label>
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
          type="button"
          alignSelf="flex-start"
          width={{ base: "100%", lg: "8rem" }}
          mt={4}
          colorPalette="teal"
          rounded="full"
          onClick={handleSubmit}
          loading={updateJob.isPending}
          loadingText="Updating"
        >
          Update
        </Button>
      </Flex>
    </Fieldset.Root>
  );
};

export default UpdateJobModal;

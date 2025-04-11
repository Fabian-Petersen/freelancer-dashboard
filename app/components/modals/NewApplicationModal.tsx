"use client";
import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { Job } from "@/types/job";
// import SelectJobStatus from "./SelectJobStatus";
import ModalFormInput from "./ModalFormInput";
import { useRef } from "react";
// import { status } from "@/public/data/selectInputData";

import {
  Button,
  Fieldset,
  Flex,
  Stack,
  SimpleGrid,
  Container,
  Field,
} from "@chakra-ui/react";

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useCreate } from "../../hooks/useFetchDataHook";

const NewApplicationModal = () => {
  // $ State to open the modal to add a new project
  const { setIsNewJobModalOpen, isNewJobModalOpen } = useGlobalContext();

  // $ Initialize project form state
  const [newApplicationForm, setNewApplicationForm] = useState<Omit<Job, "id">>(
    {
      job_title: "",
      company: "",
      city: "",
      date_applied: "",
      location_type: "",
      // tags: [""],
      status: "",
      contract: "",
    }
  );

  const contentRef = useRef<HTMLDivElement>(null); // Initialize project form state

  // $ Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewApplicationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createJob = useCreate("applications");
  const handleJobSubmit = async () => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
      console.log("Job POST Data:", newApplicationForm);
    });

    try {
      console.log("Payload sent:", newApplicationForm);
      console.log("Stringified:", JSON.stringify(newApplicationForm));
      await createJob.mutateAsync(newApplicationForm as Job);
      toaster.promise(promise, {
        success: {
          title: "New Job Application",
          description: "Job Successfully Created",
        },
        error: {
          title: "Upload Failed",
          description: "Something wrong with the upload",
        },
        loading: { title: "Uploading...", description: "Please wait" },
      });

      // Close the modal and reset form
      setIsNewJobModalOpen(false);
      // setNewApplicationForm(initialFormData);
    } catch (error) {
      toaster.create({
        title: "Error!!",
        description: "An error occured creating new application",
        type: "error",
      });
      console.error("Error creating application:", error);
    }
  };

  return (
    <Container
      position={"absolute"}
      width={"100%"}
      height={"100vh"}
      display={isNewJobModalOpen ? "block" : "none"}
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
            New Job Applciation Details
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Please enter the details below.
          </Fieldset.HelperText>
        </Stack>
        <Fieldset.Content ref={contentRef}>
          <SimpleGrid columns={2} mt={4} gap={4}>
            <ModalFormInput
              name="job_title"
              label="Job Title"
              onChange={handleInputChange}
              value={newApplicationForm.job_title}
            />
            <ModalFormInput
              name="company"
              label="company"
              onChange={handleInputChange}
              value={newApplicationForm.company}
            />
            <ModalFormInput
              name="contract"
              label="Contract Type"
              onChange={handleInputChange}
              value={newApplicationForm.contract}
            />
            <ModalFormInput
              name="city"
              label="City"
              onChange={handleInputChange}
              value={newApplicationForm.city}
            />
            <ModalFormInput
              name="location_type"
              label="location"
              onChange={handleInputChange}
              value={newApplicationForm.location_type}
            />
            <ModalFormInput
              name="status"
              label="status"
              onChange={handleInputChange}
              value={newApplicationForm.status}
            />
            <Field.Root>
              {/* <Field.Label htmlFor={"status"} textTransform={"capitalize"}>
                status
              </Field.Label> */}
              {/* <SelectInput
                contentRef={contentRef}
                items={status}
                value={newApplicationForm.status?.[0] || ""}
                onChange={(val) =>
                  setNewApplicationForm((prev) => ({
                    ...prev,
                    status: val as Job["status"],
                  }))
                }
              /> */}
            </Field.Root>
            <ModalFormInput
              name="date_applied"
              label="Date Applied"
              type="date"
              onChange={handleInputChange}
              value={newApplicationForm.date_applied}
            />
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
              setIsNewJobModalOpen(false);
            }}
            disabled={createJob.isPending}
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
              handleJobSubmit();
            }}
            loading={createJob.isPending}
            loadingText="Submitting"
          >
            Submit
          </Button>
        </Flex>
      </Fieldset.Root>
    </Container>
  );
};

export default NewApplicationModal;

"use client";
import { toaster } from "@/components/ui/toaster";
import ModalFormInput from "./ModalFormInput";

// $ Chakra Components
import { Button, Fieldset, Flex, Stack, SimpleGrid } from "@chakra-ui/react";

// $ React-Hook-Form, zod & schema
import { jobSchema } from "@/app/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type FormValues = z.infer<typeof jobSchema>;

import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useCreate } from "../../hooks/useFetchDataHook";

const NewApplicationModal = () => {
  const { setIsNewJobModalOpen } = useGlobalContext();

  // $ Form Schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(jobSchema),
  });

  // const onSubmit = handleSubmit((data) => console.log(data));

  // $ State to open the modal to add a new project
  const createJob = useCreate("applications");
  const handleJobSubmit = async (formData: FormValues) => {
    console.log("form errors:", errors);
    console.log("RHF FormData:", formData);
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });

    try {
      await createJob.mutateAsync(formData);
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
      // $ Close the modal and reset form
      setIsNewJobModalOpen(false);
      reset();
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
    <form onSubmit={handleSubmit(handleJobSubmit)}>
      <Stack gap="4" align="flex-start" maxW="lg" width={"lg"} rounded="lg">
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
          backdropBlur={"xl"}
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
          <SimpleGrid columns={2} mt={4} gap={4}>
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
            {/* <Field.Root>
          <Field.Label htmlFor={"status"} textTransform={"capitalize"}>
          status
          </Field.Label>
          <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SelectInput
            contentRef={contentRef}
            items={status}
            value={newApplicationForm.status?.[0] || ""}
            // onChange={(val) =>
            // setNewApplicationForm((prev) => ({
              ...prev,
              status: val as Job["status"],
              }))
              }
              />
              )}
              />
              </Field.Root> */}
            <ModalFormInput<FormValues>
              name="date_applied"
              label="Date Applied"
              type="date"
              register={register}
              error={errors.date_applied}
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
              loading={createJob.isPending}
              loadingText="Submitting"
              onClick={() => console.log("submit button clicked")}
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

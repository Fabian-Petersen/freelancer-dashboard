"use client";

import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { testSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormValues = z.infer<typeof testSchema>;

const TestComponentRHF = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(testSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "absolute",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <Stack gap="4" align="flex-start" maxW="lg" width={"lg"} rounded="lg">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First name</Field.Label>
          <Input {...register("firstName")} />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Last name</Field.Label>
          <Input {...register("lastName")} />
          <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};
export default TestComponentRHF;

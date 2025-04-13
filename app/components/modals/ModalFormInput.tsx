import { Field, Input } from "@chakra-ui/react"; // Adjust if you're using a different lib
import { HTMLInputTypeAttribute } from "react";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type FormInputProps<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
};

const ModalFormInput = <TFieldValues extends FieldValues>({
  label,
  name,
  placeholder,
  register,
  error,
  type = "text",
}: FormInputProps<TFieldValues>) => {
  return (
    <Field.Root invalid={!!error}>
      <Field.Label
        color={{ base: "gray.700", _dark: "gray.50/60" }}
        htmlFor={String(name)}
        textTransform={"capitalize"}
      >
        {label}
      </Field.Label>
      <Input
        id={String(name)}
        type={String(type)}
        placeholder={placeholder}
        borderColor={{ base: "gray.400/40", _dark: "gray.500/50" }}
        color={{ base: "gray.700", _dark: "gray.50/60" }}
        _placeholder={{ color: "inherit" }}
        {...register(name)}
        p={1}
      />
      {error && (
        <Field.ErrorText color={"red.500"}>{error.message}</Field.ErrorText>
      )}
    </Field.Root>
  );
};

export default ModalFormInput;

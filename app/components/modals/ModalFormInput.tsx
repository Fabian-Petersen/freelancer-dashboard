import { Field, Input } from "@chakra-ui/react"; // Adjust if you're using a different lib
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";

type FormInputProps<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  type?: string;
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
      <Field.Label htmlFor={String(name)} textTransform={"capitalize"}>
        {label}
      </Field.Label>
      <Input
        id={String(name)}
        type={type}
        placeholder={placeholder}
        textTransform={type === "date" ? "none" : "capitalize"}
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

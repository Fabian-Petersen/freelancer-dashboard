import React from "react";

import { Field, Input } from "@chakra-ui/react";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const ModalFormInput: React.FC<FormInputProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <Field.Root>
      <Field.Label htmlFor={name} textTransform={"capitalize"}>
        {label}
      </Field.Label>
      <Input
        id={name}
        name={name}
        px="0.5rem"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        textTransform={type === "date" ? "none" : "capitalize"}
      />
    </Field.Root>
  );
};

export default ModalFormInput;

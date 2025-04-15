import React from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  title: string;
};

export default function ActionButton({ title }: Props) {
  return (
    <Button
      variant={"outline"}
      colorPalette={"teal"}
      size="md"
      rounded="md"
      px="1rem"
      width="5rem"
      py="0.8rem"
      textTransform={"capitalize"}
    >
      {title}
    </Button>
  );
}

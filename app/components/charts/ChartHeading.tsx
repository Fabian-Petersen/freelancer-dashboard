import React from "react";
import { Heading } from "@chakra-ui/react";

type Props = { title?: string; style: string };

function ChartHeading({ title }: Props) {
  return (
    <Heading size="md" mb={4} color="blue.500">
      {title}
    </Heading>
  );
}

export default ChartHeading;

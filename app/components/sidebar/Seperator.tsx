import React from "react";
import { Box } from "@chakra-ui/react";

type Props = { height: string };

export default function Seperator({ height }: Props) {
  return (
    <Box
      height={height}
      border={{
        base: `${height} solid white`,
        _dark: `${height} solid rgba(55, 65, 81,1)`,
      }}
      my={4}
    />
  );
}

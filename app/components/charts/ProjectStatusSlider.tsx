import React from "react";
import { Slider } from "@chakra-ui/react";

type Props = { status: number; onChange: (value: number) => void };

const ProjectStatusSlider = ({ status, onChange }: Props) => {
  console.log(status);

  return (
    <Slider.Root
      width="200px"
      defaultValue={[status]}
      min={0}
      max={100}
      step={1}
      _hover={{ cursor: "pointer" }}
      _active={{ cursor: "grabbing" }}
    >
      <Slider.Control
        onChange={(event) => {
          const value = parseInt((event.target as HTMLInputElement).value, 10);
          onChange(value);
        }}
      >
        <Slider.Track bgColor={"blue.100"}>
          <Slider.Range bgColor={"blue.500"} />
        </Slider.Track>
        <Slider.Thumbs bgColor={"blue.200"} />
      </Slider.Control>
    </Slider.Root>
  );
};

export default ProjectStatusSlider;

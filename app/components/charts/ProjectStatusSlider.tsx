import React from "react";
import { Slider } from "@chakra-ui/react";

type Props = { status: number; onChange: (value: number) => void };

const ProjectStatusSlider = ({ status, onChange }: Props) => {
  return (
    <Slider.Root
      width="200px"
      defaultValue={[status]}
      min={0}
      max={100}
      step={1}
      _hover={{ cursor: "pointer" }}
      _active={{ cursor: "grabbing" }}
      colorPalette={status < 20 ? "red" : status < 80 ? "blue" : "green"}
    >
      <Slider.Control
        onChange={(event) => {
          const value = parseInt((event.target as HTMLInputElement).value, 10);
          onChange(value);
        }}
      >
        <Slider.Track
          bgColor={
            status < 20 ? "red.100" : status < 80 ? "blue.100" : "green.100"
          }
          ring="1px"
          ringColor={"blue.200"}
        >
          <Slider.Range
            bgColor={
              status < 20 ? "red.500" : status < 80 ? "blue.500" : "green.500"
            }
          />
        </Slider.Track>
        <Slider.Thumbs
          bgColor={
            status < 20 ? "red.200" : status < 80 ? "blue.200" : "green.200"
          }
        />
      </Slider.Control>
    </Slider.Root>
  );
};

export default ProjectStatusSlider;

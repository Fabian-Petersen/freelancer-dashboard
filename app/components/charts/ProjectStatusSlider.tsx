import { Slider } from "@chakra-ui/react";

type Props = {
  projectId: string;
  status: number;
  onChange: (projectId: string, newStatus: number) => void;
  onVisualChange: (newStatus: number) => void;
};

const ProjectStatusSlider = ({
  projectId,
  status,
  onChange,
  onVisualChange,
}: Props) => {
  // Determine color based on status
  const getColorPalette = (value: number) => {
    return value < 20 ? "red" : value < 80 ? "blue" : "green";
  };

  return (
    <Slider.Root
      width={{ base: "10", xl: "15rem" }}
      maxWidth={"300px"}
      value={[status]}
      min={0}
      max={100}
      step={1}
      _hover={{ cursor: "pointer" }}
      _active={{ cursor: "grabbing" }}
      colorPalette={getColorPalette(status)}
      onValueChange={(e) => {
        // This updates UI in real-time while dragging
        onVisualChange(e.value[0]);
      }}
      onValueChangeEnd={(e) => {
        // This fires when drag ends to update the database
        onChange(projectId, e.value[0]);
      }}
    >
      <Slider.Control>
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

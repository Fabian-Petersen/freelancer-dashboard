import React from "react";
import { Button } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { PlusCircle } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

const AddTaskButton = () => {
  const { setIsNewTaskModalOpen } = useGlobalContext();

  return (
    <Tooltip showArrow content="Add New Application">
      <Button
        color="teal.500"
        rounded="md"
        maxWidth="2rem"
        variant="solid"
        bgColor="transparent"
        onClick={() => setIsNewTaskModalOpen(true)}
      >
        <PlusCircle />
      </Button>
    </Tooltip>
  );
};

export default AddTaskButton;

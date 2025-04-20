import { Box, Menu, Portal, Flex, Text } from "@chakra-ui/react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

import { Task } from "@/app/schemas";

type TaskMenuButtonProps = {
  task: Task;
};

const TaskMenuButton = ({ task }: TaskMenuButtonProps) => {
  const {
    setIsUpdateTaskModalOpen,
    setSelectedTask,
    setIsDeleteModalOpen,
    setItemToDelete,
    setResourceTypeToDelete,
  } = useGlobalContext();

  // $ logic to edit a task
  const handleEditTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsUpdateTaskModalOpen(true);
    setSelectedTask(task);
  };

  // $ logic to delete a task
  const handleDeleteTask = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setItemToDelete(task);
    setResourceTypeToDelete("tasks");
    setIsDeleteModalOpen(true);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box
          as="button"
          _hover={{ cursor: "pointer" }}
          color={{ base: "gray.500", _dark: "gray.300" }}
          fontSize={{ base: "0.6rem", lg: "0.5rem" }}
          outline="none"
        >
          <MoreVertical size="1rem" />
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content px={2} bgColor={{ base: "white", _dark: "#222e44" }}>
            <Flex gap={2} flexDirection="column" p={2}>
              <Menu.Item
                value="rename"
                p={1}
                letterSpacing={"0.08rem"}
                bgColor="transparent"
                _hover={{
                  cursor: "pointer",
                  color: "blue.500",
                }}
                onClick={handleEditTask}
              >
                <Flex gap={2} align="center">
                  <Pencil size={16} />
                  <Text>Edit</Text>
                </Flex>
              </Menu.Item>
              <Menu.Item
                value="delete"
                color="orange.500"
                p={1}
                letterSpacing={"0.08rem"}
                bgColor="transparent"
                _hover={{
                  cursor: "pointer",
                  color: "red.600",
                }}
                onClick={handleDeleteTask}
              >
                <Flex gap={2} align="center">
                  <Trash2 size={16} />
                  <Text>Delete</Text>
                </Flex>
              </Menu.Item>
            </Flex>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default TaskMenuButton;

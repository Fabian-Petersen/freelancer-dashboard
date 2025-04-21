// TaskContainer.tsx
import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Spinner,
  Heading,
  Button,
  Badge,
} from "@chakra-ui/react";

import { Task } from "@/app/schemas";
import { useGetAll } from "@/app/hooks/useFetchDataHook";
import AddTaskButton from "./AddTaskButton";
import TaskMenuButton from "./TaskMenuButton";

const TaskContainer = () => {
  const { data: Tasks, isPending, isError, error } = useGetAll<Task>("tasks");
  const [openTaskId, setOpenTaskId] = useState<string | "">("");

  if (isPending) {
    return (
      <Box
        textAlign="center"
        py={10}
        color={{ base: "gray.600", _dark: "white" }}
      >
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Loading Tasks...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={10} color="red.500">
        <Text>
          Error loading Tasks:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </Box>
    );
  }

  // $ Function to format the date
  const formatDate = (input: string | Date) => {
    const date = typeof input === "string" ? new Date(input) : input;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <>
      <Flex justify="space-between" alignItems="center" mb={4}>
        <Heading size="md" color="blue.500">
          Task List
        </Heading>
        <AddTaskButton />
      </Flex>

      <Flex direction="column" gap={3}>
        {Tasks && Tasks.length > 0 ? (
          Tasks.map((task: Task) => (
            <Box
              key={task.id}
              position="relative"
              p={3}
              bgColor={{ base: "gray.200/80", _dark: "#222e44" }}
              border={{
                base: "1px solid gray.200",
                _dark: "1px solid rgba(55, 65, 81, 0.5)",
              }}
              borderRadius="lg"
              color={{ base: "gray.600", _dark: "white" }}
              _hover={{ cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenTaskId((prevId) =>
                  prevId === task.id ? "" : task.id || ""
                );
              }}
            >
              <Flex direction="column" gap={2}>
                <Flex>
                  <Text
                    fontSize={{ base: "0.6rem", lg: "0.7rem" }}
                    color="green.500"
                  >
                    Created on {formatDate(task.due_date)}
                  </Text>
                </Flex>
                {/*  // $ ================== Menu Button ================== */}
                <Box
                  onClick={(e) => e.stopPropagation()}
                  position="absolute"
                  top="2"
                  right="2"
                >
                  <TaskMenuButton task={task} />
                </Box>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "0.9rem", xl: "0.8rem" }}
                >
                  {task.task_title}
                </Text>
                {task.description && (
                  <Text
                    fontSize={{ base: "0.625rem", xl: "0.75rem" }}
                    transition={"height"}
                    transitionDuration={"1000"}
                    opacity={openTaskId === task.id ? "100" : "0"}
                    height={openTaskId === task.id ? "auto" : 0}
                  >
                    {task.description}
                  </Text>
                )}
                <Flex gap={2}>
                  <Badge
                    fontSize={{ base: "0.625rem", xl: "0.75rem" }}
                    px="8px"
                    py="4px"
                    rounded="17px"
                    width="fit-content"
                    textTransform="capitalize"
                    color={
                      task.priority === "low"
                        ? "green.500"
                        : task.priority === "medium"
                        ? "orange"
                        : "red.400"
                    }
                    bgColor={
                      task.priority === "low"
                        ? "green.100"
                        : task.priority === "medium"
                        ? "orange"
                        : "red.100"
                    }
                  >
                    {/* <Box as="span">Priority - {""}</Box> */}
                    {task.priority}
                  </Badge>
                  <Badge
                    fontSize={{ base: "0.6rem", lg: "0.7rem" }}
                    textTransform="capitalize"
                    px="8px"
                    py="4px"
                    rounded="17px"
                    width="fit-content"
                    color={
                      task.status === "todo"
                        ? "yellow.600"
                        : task.status === "in progress"
                        ? "blue.600"
                        : "green.600"
                    }
                    bgColor={
                      task.status === "todo"
                        ? "yellow.100"
                        : task.status === "in progress"
                        ? "blue.100"
                        : "green.100"
                    }
                  >
                    {task.status}
                  </Badge>
                </Flex>
              </Flex>
            </Box>
          ))
        ) : (
          <Text
            textAlign="center"
            py={4}
            color={{ base: "gray.600", _dark: "white" }}
          >
            No tasks found. Add a new task to get started.
          </Text>
        )}
      </Flex>
    </>
  );
};

export default TaskContainer;

import { Box, Text, Flex, Badge } from "@chakra-ui/react";
import { Task } from "@/app/schemas/";

const TaskCard = ({ task }: { task: Task }) => {
  const FormatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  const statusColor = {
    todo: "yellow",
    "in progress": "blue",
    done: "green",
  };

  const priorityColor = {
    low: "gray",
    medium: "purple",
    high: "red",
  };

  return (
    <Box
      p={3}
      bg={{ base: "gray.200/80", _dark: "#222e44" }}
      border="1px solid"
      borderColor={{ base: "gray.200", _dark: "rgba(55, 65, 81, 0.5)" }}
      borderRadius="lg"
      zIndex={10}
      color={{ base: "gray.700", _dark: "white" }}
    >
      <Flex justify="space-between" mb={2}>
        <Badge
          colorScheme={statusColor[task.status]}
          textTransform="capitalize"
        >
          {task.status}
        </Badge>
        <Text fontSize="xs" color="green.500">
          {`Created ${FormatDate(task.created_at)}`}
        </Text>
      </Flex>
      <Text fontWeight="bold" fontSize="md" textTransform="capitalize">
        {task.title}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {task.description}
      </Text>
      <Badge
        mt={2}
        colorScheme={priorityColor[task.priority]}
        textTransform="capitalize"
        px={2}
        py={1}
        rounded="full"
        fontSize="0.75rem"
      >
        {task.priority} priority
      </Badge>
    </Box>
  );
};

export default TaskCard;

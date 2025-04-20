import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "@/app/schemas";
import { Task } from "@/app/schemas";

const AddTaskForm = ({ onAdd }: { onAdd: (task: Task) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      created_at: new Date(),
    },
  });

  const onSubmit = (data: Task) => {
    onAdd({ ...data, id: crypto.randomUUID(), created_at: new Date() });
    reset();
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg={{ base: "gray.100", _dark: "#1f2937" }}
      p={4}
      borderRadius="lg"
      border={{
        base: "1px solid gray.200",
        _dark: "1px solid rgba(55, 65, 81, 0.5)",
      }}
      mb={4}
    >
      <Flex direction="column" gap={3}>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>Title</FormLabel>
          <Input placeholder="Task title" {...register("title")} />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Description (optional)"
            {...register("description")}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select {...register("status")}>
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Priority</FormLabel>
          <Select {...register("priority")}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Add Task
        </Button>
      </Flex>
    </Box>
  );
};

export default AddTaskForm;

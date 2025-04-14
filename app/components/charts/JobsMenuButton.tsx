import { Box, Menu, Portal, Flex } from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";

import { z } from "zod";
import { jobSchema } from "@/app/schemas";
type Job = z.infer<typeof jobSchema>;

type JobsMenuButtonProps = {
  job: Job;
};

const JobsMenuButton = ({ job }: JobsMenuButtonProps) => {
  const {
    setIsUpdateJobModalOpen,
    setSelectedJob,
    setIsDeleteModalOpen,
    setItemToDelete,
    setResourceTypeToDelete,
  } = useGlobalContext();

  // $ logic to edit a project
  const handleEditJob = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsUpdateJobModalOpen(true);
    setSelectedJob(job);
  };

  // $ logic to delete a project
  const handleDeleteJob = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setItemToDelete(job);
    setResourceTypeToDelete("applications");
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
        >
          <MoreVertical size="1rem" />
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content px={2}>
            <Flex gap={2} flexDirection="column" p={2}>
              <Menu.Item
                value="rename"
                p={1.5}
                letterSpacing={"0.08rem"}
                _hover={{ cursor: "pointer", bg: "transparent" }}
                onClick={handleEditJob}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                value="delete"
                color="fg.error"
                p={1.5}
                letterSpacing={"0.08rem"}
                _hover={{
                  bg: "bg.error",
                  color: "fg.error",
                  cursor: "pointer",
                }}
                onClick={handleDeleteJob}
              >
                Delete
              </Menu.Item>
            </Flex>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

export default JobsMenuButton;

import { Box, Menu, Portal, Flex } from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useDelete } from "@/app/hooks/useFetchDataHook";

import { z } from "zod";
import { jobSchema } from "@/app/schemas";
type Job = z.infer<typeof jobSchema>;

type JobsMenuButtonProps = {
  job: Job;
};

const JobsMenuButton = ({ job }: JobsMenuButtonProps) => {
  const { setIsUpdateJobModalOpen, setSelectedJob } = useGlobalContext();

  const deleteJob = useDelete("applications");

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob.mutateAsync(id);
      // Success handling (optional) - could show a toast notification
    } catch (error) {
      console.error("Error deleting job:", error);
      // Error handling (optional) - could show error toast
    }
  };

  const handleEditClick = () => {
    setSelectedJob(job);
    setIsUpdateJobModalOpen(true);
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
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  handleEditClick();
                }}
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
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  if (job?.id) {
                    handleDeleteJob(job.id);
                  }
                }}
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

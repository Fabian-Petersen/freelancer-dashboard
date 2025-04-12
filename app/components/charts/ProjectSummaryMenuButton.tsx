import { Flex, Menu, Box, Portal } from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import { Project } from "@/types/project";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useDelete } from "@/app/hooks/useFetchDataHook";

type Props = {
  project: Project;
};

const ProjectSummaryMenuButton = ({ project }: Props) => {
  const { setIsUpdateProjectModalOpen } = useGlobalContext();
  // console.log("open update modal:", isUpdateProjectModalOpen);

  const deleteProject = useDelete("projects");
  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject.mutateAsync(id);
      // Success handling (optional) - could show a toast notification
    } catch (error) {
      console.error("Error deleting project:", error);
      // Error handling (optional) - could show error toast
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box
          as="button"
          _hover={{ cursor: "pointer" }}
          color={"gray.500"}
          fontSize={{ base: "0.6rem", lg: "0.5rem" }}
          onClick={() => {}}
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
                onClick={() => {
                  setIsUpdateProjectModalOpen(true);
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
                onClick={() => project.id && handleDeleteProject(project.id)}
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

export default ProjectSummaryMenuButton;

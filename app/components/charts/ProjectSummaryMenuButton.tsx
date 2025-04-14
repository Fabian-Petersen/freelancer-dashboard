import { Flex, Menu, Box, Portal } from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { projectSchema } from "@/app/schemas";

import { z } from "zod";
type Project = z.infer<typeof projectSchema>;

type Props = {
  project: Project;
};

const ProjectSummaryMenuButton = ({ project }: Props) => {
  const {
    setIsUpdateProjectModalOpen,
    setSelectedProject,
    setIsDeleteModalOpen,
    setItemToDelete,
    setResourceTypeToDelete,
  } = useGlobalContext();

  // $ logic to edit a project
  const handleEditProject = () => {
    setIsUpdateProjectModalOpen(true);
    setSelectedProject(project);
  };

  // $ logic to delete a project
  const handleDeleteProject = () => {
    setItemToDelete(project);
    setResourceTypeToDelete("projects");
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
                onClick={handleEditProject}
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
                onClick={handleDeleteProject}
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

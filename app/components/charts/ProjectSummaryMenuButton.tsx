import { Flex, Menu, Box, Portal, Text } from "@chakra-ui/react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
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
          border="none"
          _hover={{ cursor: "pointer" }}
          color={{ base: "gray.500", _dark: "gray.300" }}
          fontSize={{ base: "0.6rem", lg: "0.5rem" }}
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
                onClick={handleEditProject}
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
                bgColor="transparent"
                letterSpacing={"0.08rem"}
                _hover={{
                  cursor: "pointer",

                  color: "red.600",
                }}
                onClick={handleDeleteProject}
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

export default ProjectSummaryMenuButton;

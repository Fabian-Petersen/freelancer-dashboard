"use client";

import { Box, Button, HStack, Spinner, Text } from "@chakra-ui/react";
import ChartHeading from "../charts/ChartHeading";
import ProjectStatusSlider from "./ProjectStatusSlider";
import { PlusCircle } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import NewProjectModal from "../modals/NewProjectModal";
import { useUpdateProject, useProjects } from "@/app/hooks/useProjects";
import UpdateProjectModal from "../modals/UpdateProjectModal";

import { Project } from "@/app/utils/api";

function ProjectSummaryTable() {
  const {
    setIsProjectModalOpen,
    setProjectStatus,
    setIsUpdateModalOpen,
    isUpdateModalOpen,
    selectedProject,
    setSelectedProject,
  } = useGlobalContext();
  // const { data: projects } = useUpdateProject();
  const { data: Projects, isPending, isError, error } = useProjects();

  // console.log("Projects Data:", Projects);
  // $ Function to update a specific project's status
  const updateProject = useUpdateProject();
  const handleStatusUpdate = async (projectId: string, newStatus: number) => {
    try {
      await updateProject.mutateAsync({
        id: projectId,
        project: { status: newStatus },
      });
      setProjectStatus(newStatus);
    } catch (err) {
      console.error("Error updating project status:", err);
    }
  };

  if (isPending) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Loading projects...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={10} color="red.500">
        <Text>
          Error loading projects:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </Box>
    );
  }

  // Function to update a specific project's status
  // const handleStatusUpdate = (id: string, newStatus: number) => {
  //   setProjectStatus((prev) =>
  //     prevProjects.map((project) =>
  //       project.id === projectId ? { ...project, status: newStatus } : project
  //     )
  //   );
  // };

  // Function to handle clicking on a project row
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <NewProjectModal />
      {isUpdateModalOpen ? (
        <UpdateProjectModal project={selectedProject} />
      ) : (
        ""
      )}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <ChartHeading title="Project Summary" />
        <HStack>
          <Button
            colorPalette="teal"
            variant="solid"
            px={4}
            onClick={() => setIsProjectModalOpen(true)}
          >
            <PlusCircle /> Add New Project
          </Button>
        </HStack>
      </Box>
      <Box overflowX="auto">
        <Box as="table" width="100%">
          <Box as="thead" bg="gray.100" borderColor="gray.200" borderRadius={2}>
            <Box as="tr">
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.95rem" }}
              >
                Client
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.95rem" }}
              >
                Project
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.8rem", lg: "1rem" }}
              >
                Price
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.95rem" }}
              >
                Deadline
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.95rem" }}
              >
                Status
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.95rem" }}
              >
                Progress
              </Box>
            </Box>
          </Box>
          <Box as="tbody">
            {Projects && Projects.length > 0 ? (
              Projects.map((project) => (
                <Box
                  as="tr"
                  key={project.id}
                  _hover={{ bg: "gray.50", cursor: "pointer" }}
                  onClick={() => handleProjectClick(project)}
                  transition="all 0.2s"
                >
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.875rem" }}
                  >
                    {project.client}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.875rem" }}
                  >
                    {project.name}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.875rem" }}
                  >
                    R {project.price.toLocaleString()}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.875rem" }}
                  >
                    {new Date(project.deadline).toLocaleDateString()}
                  </Box>
                  <Box as="td" px={4} py={3}>
                    {project.status !== undefined && (
                      <ProjectStatusSlider
                        status={project.status}
                        onChange={(newStatus) => {
                          if (project.id) {
                            handleStatusUpdate(project.id, newStatus);
                          }
                        }}
                      />
                    )}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.875rem" }}
                    color={
                      (project.status || 0) < 40
                        ? "red.500"
                        : (project.status || 0) >= 80
                        ? "green.500"
                        : "blue.500"
                    }
                  >
                    {project.status || 0}%
                  </Box>
                </Box>
              ))
            ) : (
              <Box as="tr">
                <Box as="td" textAlign="center" py={4}>
                  No projects found. Add a new project to get started.
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProjectSummaryTable;

"use client";

// $ Chakra UI Components
import { Box, Button, HStack, Spinner, Text, Flex } from "@chakra-ui/react";

// $ components
import ChartHeading from "../charts/ChartHeading";
import ProjectStatusSlider from "./ProjectStatusSlider";
import { PlusCircle } from "lucide-react";
import ProjectSummaryMenuButton from "./ProjectSummaryMenuButton";

// $ modals
import NewProjectModal from "../modals/NewProjectModal";
import UpdateProjectModal from "../modals/UpdateProjectModal";

// $ types
import { Project } from "@/types/project";

// $ functions
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useGetAll } from "@/app/hooks/useFetchDataHook";

function ProjectSummaryTable() {
  const {
    setIsNewProjectModalOpen,
    isNewProjectModalOpen,
    isUpdateProjectModalOpen,
    selectedProject,
  } = useGlobalContext();

  // $ Fetch all the projects Data
  const {
    data: Projects,
    isPending,
    isError,
    error,
  } = useGetAll<Project>("projects");

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

  return (
    <>
      {isNewProjectModalOpen ? <NewProjectModal /> : null}
      {isUpdateProjectModalOpen && selectedProject ? (
        <UpdateProjectModal project={selectedProject} />
      ) : null}
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
            onClick={() => {
              setIsNewProjectModalOpen(true);
              console.log("Open New Project Button:", isNewProjectModalOpen);
            }}
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
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Client
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Project
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Price
                <Box as="sup" fontSize={{ base: "0.65rem", lg: "0.7rem" }}>
                  (R)
                </Box>
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Deadline
              </Box>
              <Box
                as="th"
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Status
              </Box>
            </Box>
          </Box>
          <Box as="tbody">
            {Projects && Projects.length > 0 ? (
              Projects.map((project) => (
                <Box
                  as="tr"
                  key={project.id}
                  _hover={{ bg: "gray.50" }}
                  // onClick={() => handleProjectClick(project)}
                  transition="all 0.2s"
                >
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  >
                    {project.client}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  >
                    {project.name}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  >
                    {project.price.toLocaleString()}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  >
                    {new Date(project.deadline).toLocaleDateString()}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                  >
                    <Flex gap={2} justifyContent="space-between" align="center">
                      {project.status !== undefined && (
                        <ProjectStatusSlider
                          status={project.status}
                          onChange={(newStatus) => {
                            console.log(newStatus);
                            // handleStatusUpdate(project.id, newStatus);
                          }}
                        />
                      )}
                      <Box
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
                      <ProjectSummaryMenuButton project={project} />
                    </Flex>
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

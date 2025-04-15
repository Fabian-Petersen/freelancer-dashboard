"use client";
import React, { useState } from "react";
// $ Chakra UI Components
import {
  Box,
  Button,
  Spinner,
  Text,
  Flex,
  Table,
  Heading,
  IconButton,
} from "@chakra-ui/react";
// import { toaster } from "@/components/ui/toaster";
import { z } from "zod";

// $ components
import ProjectStatusSlider from "./ProjectStatusSlider";
import { PlusCircle } from "lucide-react";
import ProjectSummaryMenuButton from "./ProjectSummaryMenuButton";

// $ types
import { projectSchema } from "@/app/schemas";
type Project = z.infer<typeof projectSchema>;

// $ functions
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useGetAll, useUpdate } from "@/app/hooks/useFetchDataHook";

function ProjectSummaryTable() {
  const { setIsNewProjectModalOpen } = useGlobalContext();
  // $Track visual status updates locally
  const [localProjectStatus, setLocalProjectStatus] = useState<
    Record<string, number>
  >({});

  // $ Fetch all the projects Data
  const {
    data: Projects,
    isPending,
    isError,
    error,
  } = useGetAll<Project>("projects");
  console.log("all projects data:", Projects);

  // $ Use the update hook for projects
  const updateProject = useUpdate<Project>("projects");

  if (isPending) {
    return (
      <Box
        textAlign="center"
        py={10}
        color={{ base: "gray.600", _dark: "white" }}
      >
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

  // $ Handle immediate visual updates without sending to the database
  const handleVisualStatusUpdate = (projectId: string, newStatus: number) => {
    setLocalProjectStatus((prev) => ({
      ...prev,
      [projectId]: newStatus,
    }));
  };

  // $ Handle debounced database updates
  const handleDatabaseStatusUpdate = async (
    projectId: string,
    newStatus: number
  ) => {
    try {
      console.log("database status update:", newStatus);
      await updateProject.mutateAsync({
        id: projectId,
        entity: { status: newStatus },
      });
    } catch (error) {
      console.error("Error updating project status:", error);
    }

    // Reset the local status to match the database
    setLocalProjectStatus((prev) => {
      const newState = { ...prev };
      delete newState[projectId];
      return newState;
    });
  };

  // Get the current displayed status (either local or from database)
  const getDisplayStatus = (project: Project) => {
    if (!project.id) return project.status || 0;
    return localProjectStatus[project.id] !== undefined
      ? localProjectStatus[project.id]
      : project.status || 0;
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        mb={4}
      >
        <Flex justify={"space-between"} alignItems={"center"} width="100%">
          <Heading size="md" color="blue.500">
            Projects Summary
          </Heading>
          <Button
            colorPalette="teal"
            width="10rem"
            maxWidth={{ md: "12rem" }}
            variant="solid"
            p={2}
            display={{ base: "none", lg: "block" }}
            onClick={() => {
              setIsNewProjectModalOpen(true);
            }}
          >
            <Flex gap="2" justify={"space-between"} p="">
              <PlusCircle />
              <Text>Add New Project</Text>
            </Flex>
          </Button>
          {/* //$ Add project Button on Mobile Screen */}
          <IconButton
            colorPalette="teal"
            bgColor={"transparent"}
            maxWidth={"50%"}
            color="teal.500"
            display={{ base: "block", lg: "none" }}
            onClick={() => {
              setIsNewProjectModalOpen(true);
            }}
          >
            <PlusCircle />
          </IconButton>
        </Flex>
      </Box>
      <Table.ScrollArea minWidth="100%" maxWidth="100%">
        <Table.Root width="100%">
          <Table.Header>
            <Table.Row
              bgColor={{ base: "white", _dark: "#1d2739" }}
              color={{ base: "gray.600", _dark: "white" }}
            >
              <Table.ColumnHeader
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Client
              </Table.ColumnHeader>
              <Table.ColumnHeader
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Project
              </Table.ColumnHeader>
              <Table.ColumnHeader
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Price
                <Box as="sup" fontSize={{ base: "0.65rem", lg: "0.7rem" }}>
                  (R)
                </Box>
              </Table.ColumnHeader>
              <Table.ColumnHeader
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Deadline
              </Table.ColumnHeader>
              <Table.ColumnHeader
                px={4}
                py={2}
                textAlign="left"
                fontSize={{ base: "0.85rem", lg: "0.875rem" }}
              >
                Status
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Projects && Projects.length > 0 ? (
              Projects.map((project) => {
                const currentStatus = getDisplayStatus(project);
                if (!project.id) return null; // Ensure project.id is defined
                return (
                  <Table.Row
                    key={project.id}
                    _hover={{
                      bgColor: { base: "gray.200/50", _dark: "#222e44" },
                      borderRadius: "15px",
                    }}
                    transition="all 0.2s"
                    bgColor={{ base: "white", _dark: "#1d2739" }}
                    color={
                      project.status === 100
                        ? "blue.500"
                        : { base: "gray.600", _dark: "gray.400" }
                    }
                  >
                    <Table.Cell
                      px={4}
                      py={3}
                      fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                    >
                      {project.client}
                    </Table.Cell>
                    <Table.Cell
                      px={4}
                      py={3}
                      fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                    >
                      {project.name}
                    </Table.Cell>
                    <Table.Cell
                      px={4}
                      py={3}
                      fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                    >
                      {project.price.toLocaleString()}
                    </Table.Cell>
                    <Table.Cell
                      px={4}
                      py={3}
                      fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                    >
                      {new Date(project.deadline).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell
                      px={4}
                      py={3}
                      fontSize={{ base: "0.6rem", lg: "0.8rem" }}
                    >
                      <Flex
                        gap={2}
                        justifyContent="space-between"
                        align="center"
                      >
                        {project.status !== undefined && (
                          <ProjectStatusSlider
                            projectId={project.id}
                            status={currentStatus}
                            onVisualChange={(newStatus) =>
                              project.id &&
                              handleVisualStatusUpdate(project.id, newStatus)
                            }
                            onChange={handleDatabaseStatusUpdate}
                          />
                        )}
                        <Box
                          width={{ base: "2rem", xl: "3rem" }}
                          color={
                            currentStatus < 40
                              ? "red.500"
                              : currentStatus >= 80
                              ? "green.500"
                              : "blue.500"
                          }
                        >
                          {currentStatus}%
                        </Box>
                        <ProjectSummaryMenuButton project={project} />
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell as="td" textAlign="center" py={4}>
                  No projects found. Add a new project to get started.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
}

export default ProjectSummaryTable;

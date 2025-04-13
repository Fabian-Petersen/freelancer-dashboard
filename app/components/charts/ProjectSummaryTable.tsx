"use client";

// $ Chakra UI Components
import {
  Box,
  Button,
  HStack,
  Spinner,
  Text,
  Flex,
  Table,
  IconButton,
} from "@chakra-ui/react";
import { z } from "zod";

// $ components
import ChartHeading from "../charts/ChartHeading";
import ProjectStatusSlider from "./ProjectStatusSlider";
import { PlusCircle } from "lucide-react";
import ProjectSummaryMenuButton from "./ProjectSummaryMenuButton";

// $ types
import { projectSchema } from "@/app/schemas";
type Project = z.infer<typeof projectSchema>;

// $ functions
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useGetAll } from "@/app/hooks/useFetchDataHook";

function ProjectSummaryTable() {
  const { setIsNewProjectModalOpen, isNewProjectModalOpen } =
    useGlobalContext();

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        mb={4}
      >
        <ChartHeading title="Project Summary" />
        <HStack>
          <Button
            colorPalette="teal"
            variant="solid"
            px={4}
            visibility={{ base: "hidden", lg: "visible" }}
            onClick={() => {
              setIsNewProjectModalOpen(true);
              console.log("Open New Project Button:", isNewProjectModalOpen);
            }}
          >
            <PlusCircle /> Add New Project
          </Button>
          <IconButton
            colorPalette="teal"
            bgColor={"transparent"}
            maxWidth={"20%"}
            color="teal.500"
            visibility={{ base: "visible", lg: "hidden" }}
          >
            <PlusCircle />
          </IconButton>
        </HStack>
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
              Projects.map((project) => (
                <Table.Row
                  key={project.id}
                  _hover={{
                    bgColor: { base: "gray.200/50", _dark: "#222e44" },
                    borderRadius: "15px",
                  }}
                  transition="all 0.2s"
                  bgColor={{ base: "white", _dark: "#1d2739" }}
                  color={{ base: "gray.600", _dark: "gray.400" }}
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
                  </Table.Cell>
                </Table.Row>
              ))
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

import React, { useState } from "react";
import { Box, Flex, Button, HStack } from "@chakra-ui/react";
import ChartHeading from "../charts/ChartHeading";
import ProjectStatusSlider from "./ProjectStatusSlider";
import { PlusCircle } from "lucide-react";

interface Project {
  id: number;
  client: string;
  name: string;
  deadline: string;
  price: number;
  status: number;
}

function ProjectSummaryTable() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      client: "ABC Corp",
      name: "Website Redesign",
      deadline: "2025-04-15",
      price: 2000,
      status: 25,
    },
    {
      id: 2,
      client: "XYZ Inc",
      name: "Mobile App Development",
      deadline: "2025-05-20",
      price: 1500,
      status: 60,
    },
    {
      id: 3,
      client: "123 Retail",
      name: "E-commerce Platform",
      deadline: "2025-06-30",
      price: 3000,
      status: 20,
    },
    {
      id: 4,
      client: "BlogCo",
      name: "Content Management System",
      deadline: "2025-04-22",
      price: 1200,
      status: 80,
    },
    {
      id: 5,
      client: "TechMasters",
      name: "Booking Application",
      deadline: "2025-04-22",
      price: 1200,
      status: 80,
    },
    {
      id: 6,
      client: "Warrior Software",
      name: "E-commerce Platform",
      deadline: "2025-04-22",
      price: 1200,
      status: 80,
    },
  ]);

  // Function to update a specific project's status
  const updateProjectStatus = (projectId: number, newStatus: number) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  return (
    <>
      <Flex align="center" justify="space-between" mb={4}>
        <ChartHeading title="Project Summary" />
        <HStack>
          <Button
            colorPalette="teal"
            variant="solid"
            px={4}
            onClick={() => {
              alert("Add New Project");
            }}
          >
            <PlusCircle /> Add New Project
          </Button>
        </HStack>
      </Flex>
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
            </Box>
          </Box>
          <Box as="tbody">
            {projects.map((project) => (
              <Box as="tr" key={project.id} _hover={{ bg: "gray.50" }}>
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
                  {project.price}
                </Box>
                <Box
                  as="td"
                  px={4}
                  py={3}
                  fontSize={{ base: "0.6rem", lg: "0.875rem" }}
                >
                  {project.deadline}
                </Box>
                <Flex direction="row" align="center">
                  <Box as="td" px={4} py={3}>
                    {typeof project.status === "number" && (
                      <ProjectStatusSlider
                        status={project.status}
                        onChange={(newStatus) =>
                          updateProjectStatus(project.id, newStatus)
                        }
                      />
                    )}
                  </Box>
                  <Box
                    as="td"
                    px={4}
                    py={3}
                    fontSize={{ base: "0.6rem", lg: "0.875rem" }}
                    color={
                      project.status < 40
                        ? "red.500"
                        : project.status >= 80
                        ? "green.500"
                        : "blue.500"
                    }
                  >
                    {project.status}%
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProjectSummaryTable;

import React from "react";
import ChartHeading from "../charts/ChartHeading";
import { Box, Text, Flex } from "@chakra-ui/react";

const ActiveProjectsTable = () => {
  const projectsData = [
    {
      id: 1,
      name: "Website Redesign",
      client: "ABC Corp",
      data_applied: "2025-04-01",
      deadline: "2025-04-15",
      status: ["In Progress"],
      type: ["Web", "Cloud", "SOE Optimisation"],
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "XYZ Inc",
      deadline: "2025-05-20",
      status: "Planning",
      type: ["Mobile", "Cloud", "SOE Optimisation"],
    },
    {
      id: 3,
      name: "E-commerce Platform",
      client: "123 Retail",
      deadline: "2025-06-30",
      status: "On Hold",
      type: ["Wordpress", "SOE Optimisation"],
    },
    {
      id: 4,
      name: "Content Management System",
      client: "BlogCo",
      deadline: "2025-04-22",
      status: "In Progress",
      type: ["Wordpress", "UI/UX"],
    },
  ];
  return (
    <>
      <ChartHeading title="Active Projects" />
      <Flex direction="column" gap={3}>
        {projectsData.map((project) => (
          <Box key={project.id} p={3} bg="gray.100" borderRadius={"lg"}>
            <Flex justify="space-evenly" mb={1} flexDirection="column" gap={3}>
              <Flex direction="row" align="center" justify={"space-between"}>
                <Text fontWeight="bold">{project.name}</Text>
                <Text
                  fontSize={{ base: "", lg: "0.8rem" }}
                  //   bgColor={
                  //     project.status === "In Progress"
                  //       ? "green.100"
                  //       : project.status === "Planning"
                  //       ? "orange.100"
                  //       : "red.100"
                  //   }
                  color={
                    project.status === "In Progress"
                      ? "green.600"
                      : project.status === "Planning"
                      ? "orange.500"
                      : "red.500"
                  }
                >
                  {project.status}
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.600">
                Client: {project.client}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Deadline: {project.deadline}
              </Text>
            </Flex>
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default ActiveProjectsTable;

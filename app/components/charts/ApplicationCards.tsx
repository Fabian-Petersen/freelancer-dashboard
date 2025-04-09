"use client";
import React, { useState } from "react";
import ChartHeading from "./ChartHeading";
import { Box, Text, Flex, Badge, Button, Spinner } from "@chakra-ui/react";
import { XCircleIcon } from "lucide-react";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import UpdateApplicationModal from "../modals/UpdateApplicationModal";
import { useApplications } from "@/app/hooks/useProjects";

export type JobApplicationProps = {
  id?: string;
  description: string;
  company: string;
  location: string;
  date_applied: string;
  job_details: string[];
  status: "applied" | "interview" | "on hold" | "failed";
};

const ApplciationCards = () => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const {
    setIsUpdateApplicationOpen,
    isUpdateApplicationOpen,
    selectedApplication,
    setSelectedApplication,
  } = useGlobalContext();

  // $ Fetch the data from the database
  const { data: Applications, isPending, isError, error } = useApplications();
  console.log("data for applications:", Applications);

  if (isPending) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4}>Loading Applications...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" py={10} color="red.500">
        <Text>
          Error loading Applications:
          {error instanceof Error ? error.message : "Unknown error"}
        </Text>
      </Box>
    );
  }

  // $ Function to format the date
  const FormatDate = (input: string) => {
    const date = new Date(input);

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    return formattedDate;
  };

  // $ handle Delete of Card
  const handleDeleteApplication = (id: string) => {
    console.log(`Deleting application ${id}`);
    // Add your delete logic here
  };

  // $ handle Opening Update Modal for the Applications
  const handleCardClick = (application: JobApplicationProps) => {
    setSelectedApplication(application);
    setIsUpdateApplicationOpen(true);
  };

  console.log("open application", isUpdateApplicationOpen);
  return (
    <>
      {isUpdateApplicationOpen && selectedApplication && (
        <UpdateApplicationModal application={selectedApplication} />
      )}

      <ChartHeading title="Jobs Application Status" />
      <Flex direction="column" gap={3}>
        {Applications && Applications.length > 0 ? (
          Applications.map((item) => (
            <Box
              key={item.id}
              p={3}
              bg="gray.100"
              borderRadius={"lg"}
              onMouseEnter={() => item.id && setHoveredCardId(item.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              _hover={{ cursor: "pointer" }}
              position="relative"
              onClick={() => {
                handleCardClick(item);
              }}
            >
              <Flex
                justify="space-evenly"
                mb={1}
                flexDirection="column"
                gap={3}
              >
                <Button
                  variant="solid"
                  bgColor="transparent"
                  color="gray.500"
                  display={hoveredCardId === item.id ? "flex" : "none"}
                  onClick={() =>
                    handleDeleteApplication(item.id ? item.id : "")
                  }
                  _hover={{
                    color: "gray.700",
                    cursor: "pointer",
                  }}
                  position="absolute"
                  top="0"
                  right="0"
                  translate={"50% -50%"}
                >
                  <XCircleIcon />
                </Button>
                <Flex justify="space-between">
                  <Badge
                    rounded={"full"}
                    textTransform={"capitalize"}
                    px={{ base: "5px", lg: "7px" }}
                    py={{ base: "3px", lg: "5px" }}
                    bgColor={
                      item.status === "applied"
                        ? "yellow.200"
                        : item.status === "on hold"
                        ? "gray.200"
                        : item.status === "interview"
                        ? "green.200"
                        : "red.500"
                    }
                    color={
                      item.status === "applied"
                        ? "yellow.600"
                        : item.status === "on hold"
                        ? "gray.600"
                        : item.status === "interview"
                        ? "green.600"
                        : "red.600"
                    }
                  >
                    {item.status}
                  </Badge>
                  <Text fontSize={{ base: "", lg: "0.7rem" }} color="green.500">
                    {`applied on ${FormatDate(item.date_applied)}`}
                  </Text>
                </Flex>
                <Flex direction="row" align="center" justify={"space-between"}>
                  <Text fontWeight="bold">{item.description}</Text>
                </Flex>
                <Text fontSize="sm" color="gray.600">
                  Company: {item.company}
                </Text>
                <Flex gap={2}>
                  {item.job_details.map((item, index) => {
                    return (
                      <Badge
                        rounded={"full"}
                        textTransform={"capitalize"}
                        px={{ base: "sm", lg: "7px" }}
                        py={{ base: "sm", lg: "3px" }}
                        variant={"outline"}
                        key={index}
                      >
                        {item}
                      </Badge>
                    );
                  })}
                </Flex>
              </Flex>
            </Box>
          ))
        ) : (
          <Box as="tr">
            <Box as="td" textAlign="center" py={4}>
              No projects found. Add a new project to get started.
            </Box>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default ApplciationCards;

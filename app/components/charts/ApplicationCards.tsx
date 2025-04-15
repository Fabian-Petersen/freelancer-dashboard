"use client";

// $ Chakra UI Components
import { Box, Text, Flex, Badge, Spinner, Heading } from "@chakra-ui/react";

// $ components
import AddApplicationButton from "./AddApplicationButton";
import JobsMenuButton from "./JobsMenuButton";

// $ modals

// $ types
import { z } from "zod";
import { jobSchema } from "@/app/schemas";
type Job = z.infer<typeof jobSchema>;

// $ functions
import { useGetAll } from "@/app/hooks/useFetchDataHook";

const ApplicationCards = () => {
  // $ Fetch the data from the database
  const {
    data: Applications,
    isPending,
    isError,
    error,
  } = useGetAll<Job>("applications");

  if (isPending) {
    return (
      <Box
        textAlign="center"
        py={10}
        color={{ base: "gray.600", _dark: "white" }}
      >
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
  const FormatDate = (input: string | Date) => {
    const date = typeof input === "string" ? new Date(input) : input;

    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    return formattedDate;
  };

  return (
    <>
      <Flex justify="space-between" alignItems="center" mb={4}>
        <Heading size="md" color="blue.500">
          Jobs Applications
        </Heading>
        <AddApplicationButton />
      </Flex>
      <Flex
        direction="column"
        gap={3}
        // border="1px dashed yellow"
        width="100%"
      >
        {Applications && Applications.length > 0 ? (
          Applications.map((item: Job) => (
            <Box
              key={item.id}
              p={3}
              position="relative"
              bgColor={{ base: "gray.200/80", _dark: "#222e44" }}
              border={{
                base: "1px solid gray.200",
                _dark: "1px solid #37415180",
              }}
              borderRadius={"lg"}
              _hover={{ cursor: "pointer" }}
              zIndex={100}
              color={{ base: "gray.600", _dark: "white" }}
            >
              <Flex
                justify="space-evenly"
                mb={1}
                flexDirection="column"
                gap={3}
                borderColor={{ base: "white", _dark: "gray.700" }}
              >
                <Flex align={"center"} gap={2}>
                  <Badge
                    marginRight={"auto"}
                    rounded={"full"}
                    textTransform={"capitalize"}
                    px={{ base: "5px", lg: "7px" }}
                    py={{ base: "3px", lg: "5px" }}
                    bgColor={
                      item.status === "applied"
                        ? "yellow.100"
                        : item.status === "on hold"
                        ? "gray.100"
                        : item.status === "interview"
                        ? "green.100"
                        : "red.100"
                    }
                    color={
                      item.status === "applied"
                        ? "yellow.500"
                        : item.status === "on hold"
                        ? "gray.500"
                        : item.status === "interview"
                        ? "green.500"
                        : "red.500"
                    }
                  >
                    {item.status}
                  </Badge>
                  <Text
                    fontSize={{ base: "0.6rem", lg: "0.7rem" }}
                    color="green.500"
                  >
                    {`applied on ${FormatDate(item.date_applied)}`}
                  </Text>
                  <JobsMenuButton job={item} />
                </Flex>
                <Flex
                  direction="row"
                  align="center"
                  justify={"space-between"}
                  textTransform={"capitalize"}
                >
                  <Text fontWeight="bold">{item.job_title}</Text>
                </Flex>
                <Text
                  fontSize="sm"
                  textTransform={"capitalize"}
                  color={{ base: "gray.600", _dark: "white" }}
                >
                  Company: {item.company}
                </Text>
                <Flex gap={2}>
                  <Badge
                    rounded={"full"}
                    textTransform={"capitalize"}
                    px={{ base: "7px", lg: "10px" }}
                    py={{ base: "4px", lg: "6px" }}
                    variant={"outline"}
                    color={
                      item.contract === "permanent"
                        ? "teal.500"
                        : item.contract === "contract"
                        ? "cyan.500"
                        : item.contract === "freelance"
                        ? "purple.500"
                        : "red.500"
                    }
                    bgColor={
                      item.contract === "permanent"
                        ? "teal.100"
                        : item.contract === "contract"
                        ? "cyan.100"
                        : item.contract === "freelance"
                        ? "purple.100"
                        : "red.100"
                    }
                  >
                    {item.contract}
                  </Badge>
                  <Badge
                    rounded={"full"}
                    textTransform={"capitalize"}
                    px={{ base: "7px", lg: "10px" }}
                    py={{ base: "4px", lg: "4px" }}
                    variant={"outline"}
                    outline="none"
                    color={
                      item.location_type === "remote"
                        ? "teal.500"
                        : item.location_type === "on site"
                        ? "cyan.500"
                        : item.location_type === "hybrid"
                        ? "purple.500"
                        : "red.500"
                    }
                    bgColor={
                      item.location_type === "remote"
                        ? "teal.100"
                        : item.location_type === "on site"
                        ? "cyan.100"
                        : item.location_type === "hybrid"
                        ? "purple.100"
                        : "red.100"
                    }
                  >
                    {item.location_type}
                  </Badge>
                </Flex>
              </Flex>
            </Box>
          ))
        ) : (
          <Box as="tr">
            <Box
              as="td"
              textAlign="center"
              py={4}
              color={{ base: "gray.600", _dark: "white" }}
            >
              No Jobs found. Add a new job to get started.
            </Box>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default ApplicationCards;

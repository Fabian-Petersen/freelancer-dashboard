"use client";

// $ Chakra UI Components
import { Box, Text, Flex, Badge, Spinner, Heading } from "@chakra-ui/react";

// $ components
// import { XCircleIcon } from "lucide-react";
import AddApplicationButton from "./AddApplicationButton";
import JobsMenuButton from "./JobsMenuButton";

// $ modals
// import NewApplicationModal from "../modals/NewApplicationModal";
import UpdateJobModal from "../modals/UpdateJobModal";

// $ types
import { Job } from "@/types/job";

// $ functions
// import { useDelete } from "@/app/hooks/useFetchDataHook";
import { useGlobalContext } from "@/app/contexts/useGlobalContext";
import { useGetAll } from "@/app/hooks/useFetchDataHook";

const ApplicationCards = () => {
  const { isUpdateJobModalOpen, selectedJob } = useGlobalContext();

  // $ Fetch the data from the database
  const {
    data: Applications,
    isPending,
    isError,
    error,
  } = useGetAll<Job>("applications");

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

  return (
    <>
      {isUpdateJobModalOpen && selectedJob && (
        <UpdateJobModal application={selectedJob} />
      )}
      <Flex justify="space-between" alignItems="center" mb={4}>
        <Heading size="md" color="blue.500">
          Jobs Applications
        </Heading>
        <AddApplicationButton />
      </Flex>
      <Flex direction="column" gap={3}>
        {Applications && Applications.length > 0 ? (
          Applications.map((item: Job) => (
            <Box
              key={item.id}
              p={3}
              position="relative"
              bgColor={{ base: "gray.200/60", _dark: "#222e44" }}
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
                    py={{ base: "4px", lg: "4px" }}
                    variant={"outline"}
                    color={{ base: "gray.600", _dark: "white" }}
                    bgColor={{
                      base: "gray.200",
                      _dark: "cyan.400/80",
                    }}
                  >
                    {item.contract}
                  </Badge>
                  <Badge
                    rounded={"full"}
                    textTransform={"capitalize"}
                    px={{ base: "7px", lg: "10px" }}
                    py={{ base: "4px", lg: "4px" }}
                    variant={"outline"}
                    color={{ base: "gray.600", _dark: "white" }}
                    outline="none"
                    bgColor={{
                      base: "gray.200",
                      _dark: "teal.400/80",
                    }}
                  >
                    {item.location_type}
                  </Badge>
                </Flex>
              </Flex>
            </Box>
          ))
        ) : (
          <Box as="tr">
            <Box as="td" textAlign="center" py={4}>
              No Jobs found. Add a new job to get started.
            </Box>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default ApplicationCards;

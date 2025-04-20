// page.tsx
"use client";

import {
  Badge,
  Table,
  ButtonGroup,
  Pagination,
  Box,
  Button,
  Text,
  Flex,
  Heading,
  Container,
  IconButton,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import { customerData } from "@/public/data/customerData";
// import CustomerSummaryMenuButton from "./CustomerSummaryMenuButton";

import { Customer } from "@/app/schemas";
import { industryColorMap } from "@/public/data/industyColorMap";

import { PlusCircle } from "lucide-react";

const PAGE_SIZE = 10;

// Mocked customer data (replace with real data from API or props)

const customerTableHeaders = [
  "Name",
  "Email",
  "Phone",
  "Location",
  "Projects",
  "Revenue",
  "Industry",
];

export default function CustomerTable() {
  const customers: Customer[] = customerData;
  const [page, setPage] = useState(1);
  const paginatedItems = customers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // const { bg, color } = industryColorMap[customers[0]?.industry || "default"];
  const { bg, color } =
    industryColorMap[customers[0]?.industry as keyof typeof industryColorMap] ||
    industryColorMap["default"];
  return (
    <Container
      bg={{ base: "white", _dark: "#1d2739" }}
      borderColor={{ base: "white", _dark: "rgba(55, 65, 81, 0.5)" }}
      minWidth="0"
      w="100%"
      p={4}
      borderRadius="md"
      overflowY="auto"
      shadow={"sm"}
      maxWidth="6xl"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        mb={4}
      >
        <Flex justify={"space-between"} alignItems={"center"} width="100%">
          <Heading size="2xl" color="blue.500">
            Customer List
          </Heading>
          <Button
            colorPalette="teal"
            width="12rem"
            maxWidth={{ md: "12rem" }}
            variant="solid"
            p={2}
            display={{ base: "none", lg: "block" }}
            // onClick={() => {
            //   setIsNewProjectModalOpen(true);
            // }}
          >
            <Flex gap="2" justify={"space-between"} p="">
              <PlusCircle />
              <Text>Add New Customer</Text>
            </Flex>
          </Button>
        </Flex>
      </Box>
      <Table.ScrollArea maxWidth="6xl" roundedTop="10px" roundedBottom="8px">
        <Table.Root>
          <Table.Header>
            <Table.Row
              bgColor={{ base: "white", _dark: "#1d2739" }}
              color={{ base: "gray.600", _dark: "white" }}
              height="3rem"
            >
              {customerTableHeaders.map((header) => (
                <Table.ColumnHeader
                  key={header}
                  color="#626C7A"
                  border="none"
                  fontSize={{ base: "0.725rem", xl: "0.875rem" }}
                  fontWeight="600"
                  textTransform={"capitalize"}
                  px={2}
                >
                  {header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body bgColor="transparent">
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item, index) => (
                <Table.Row
                  key={index}
                  _hover={{ bgColor: "gray.200/50", cursor: "pointer" }}
                  textTransform="capitalize"
                  height="50px"
                  bgColor="transparent"
                  color={{ base: "gray.600", _dark: "white" }}
                >
                  <Table.Cell px={2}>{item.name}</Table.Cell>
                  <Table.Cell px={2}>{item.email}</Table.Cell>
                  <Table.Cell px={2}>{item.phone_number}</Table.Cell>
                  <Table.Cell px={2}>{item.location}</Table.Cell>
                  <Table.Cell px={2}>{item.projects_completed}</Table.Cell>
                  <Table.Cell px={2}>
                    R {item.total_revenue.toLocaleString()}
                  </Table.Cell>
                  <Table.Cell px={2}>
                    <Badge
                      fontSize="0.625rem"
                      p="4px 10px"
                      rounded="full"
                      bg={bg}
                      color={color}
                    >
                      {item.industry}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell as="td" textAlign="center" py={4} colSpan={7}>
                  No customers found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <Pagination.Root
        count={customers.length}
        pageSize={PAGE_SIZE}
        page={page}
        onPageChange={(details) => setPage(details.page)}
      >
        <ButtonGroup variant="ghost" size="sm" wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="Previous Page">
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(paginationPage) => (
              <IconButton
                key={paginationPage.value}
                onClick={() => setPage(paginationPage.value)}
                variant={{ base: "ghost", _selected: "outline" }}
                aria-label={`Page ${paginationPage.value}`}
              >
                {paginationPage.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton aria-label="Next Page">
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Container>
  );
}

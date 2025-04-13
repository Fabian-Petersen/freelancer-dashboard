import { Box, Grid, GridItem } from "@chakra-ui/react";

import MonthlyRevenueChart from "../charts/MonthlyRevenueChart";
import RevenueExpenseChart from "../charts/RevenueExpenseChart";
import ProjectSummaryTable from "../charts/ProjectSummaryTable";
import ApplicationCards from "../charts/ApplicationCards";

const DashboardLayout = () => {
  return (
    <Box p={4} color={{ base: "gray.700", _dark: "gray.700" }}>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 2fr", xl: "repeat(4, 1fr)" }}
        overflowX={{ base: "hidden" }}
        gap={4}
      >
        {/* //$  ============================= Chart - Monthly Revenue ======================== */}
        <GridItem
          bg={{ base: "white", _dark: "#1d2739" }}
          p={4}
          borderRadius="md"
          boxShadow="sm"
          height="300px"
          colSpan={{ base: 1, lg: 1 }}
          borderColor={{ base: "gray.500", _dark: "dark" }}
        >
          <MonthlyRevenueChart />
        </GridItem>

        {/* //$  ============================= Chart - Expense & Revenue ====================== */}
        <GridItem
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "gray.500", _dark: "#37415180" }}
          color={{ base: "gray.600", _dark: "gray.100" }}
          p={4}
          borderRadius="md"
          boxShadow="sm"
          height="300px"
          colSpan={{ base: 1, lg: 2 }}
        >
          <RevenueExpenseChart />
        </GridItem>
        {/* //$  ============================= Table - Job Applications ========================= */}
        <GridItem
          rowSpan={2}
          colSpan={{ base: 1, lg: 1 }}
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "gray.500", _dark: "#374151/80" }}
          p={4}
          borderRadius="md"
          // boxShadow="sm"
          shadow={"sm"}
        >
          <ApplicationCards />
        </GridItem>

        {/* //$  ============================= Table - Projects List =========================== */}
        <GridItem
          colSpan={{ base: 1, lg: 3 }}
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "gray.500", _dark: "#374151/80" }}
          minWidth="0"
          w="100%"
          p={4}
          borderRadius="md"
        >
          <ProjectSummaryTable />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardLayout;

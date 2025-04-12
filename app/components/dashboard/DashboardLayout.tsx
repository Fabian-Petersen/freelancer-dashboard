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
          bg={{ base: "white", _dark: "black" }}
          p={4}
          borderRadius="md"
          boxShadow="sm"
          height="300px"
          colSpan={{ base: 1, lg: 2 }}
        >
          <MonthlyRevenueChart />
        </GridItem>

        {/* //$  ============================= Chart - Expense & Revenue ====================== */}
        <GridItem
          bg="white"
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
          bg="white"
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
          bg="white"
          minWidth="0"
          w="100%"
          p={4}
          borderRadius="md"
          boxShadow="sm"
        >
          <ProjectSummaryTable />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardLayout;

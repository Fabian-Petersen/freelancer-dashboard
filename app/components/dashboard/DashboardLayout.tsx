import { Box, Grid, GridItem } from "@chakra-ui/react";

import MonthlyRevenueChart from "../charts/MonthlyRevenueChart";
import RevenueExpenseChart from "../charts/RevenueExpenseChart";
import ProjectSummaryTable from "../charts/ProjectSummaryTable";
import ActiveProjectsTable from "../charts/ApplicationCards";

const DashboardLayout = () => {
  return (
    <Box p={4} color={{ base: "gray.700", _dark: "gray.700" }}>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 2fr", lg: "1fr 2fr 1fr" }}
        gap={4}
      >
        {/* //$  ============================= Chart - Monthly Revenue ======================== */}
        <GridItem
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="sm"
          height="300px"
          colSpan={1}
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
          colSpan={{ base: 1, md: 1, lg: 1 }}
        >
          <RevenueExpenseChart />
        </GridItem>

        {/* //$  ============================= Table - Active Projects ========================= */}
        <GridItem
          rowSpan={2}
          colSpan={{ base: 1, md: 2, lg: 1 }}
          bg="white"
          p={4}
          borderRadius="md"
          // boxShadow="sm"
          shadow={"sm"}
        >
          <ActiveProjectsTable />
        </GridItem>

        {/* //$  ============================= Table - Projects List =========================== */}
        <GridItem
          colSpan={{ base: 1, md: 2, lg: 2 }}
          bg="white"
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

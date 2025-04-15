import { Box, Grid, GridItem } from "@chakra-ui/react";

// import MonthlyRevenueChart from "../charts/MonthlyRevenueChart";
import RevenueExpenseChart from "../charts/RevenueExpenseChart";
import ProjectSummaryTable from "../charts/ProjectSummaryTable";
import ApplicationCards from "../charts/ApplicationCards";
import StatsPieChart from "../charts/StatsPieChart";

const DashboardLayout = () => {
  return (
    <Box p={4} color={{ base: "gray.700", _dark: "gray.700" }}>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        overflowX={{ base: "hidden" }}
        p={{ base: 0.5, md: 1, lg: 1.5 }}
        height="100%"
        gap={4}
      >
        {/* //$  ============================= Chart - Project Stats YTD Chart ======================== */}
        <GridItem
          bg={{ base: "white", _dark: "#1d2739" }}
          // border="1px dashed red"
          p={2}
          position="relative"
          borderRadius="md"
          boxShadow="sm"
          height="300px"
          colSpan={{ base: 1 }}
          borderColor={{ base: "gray.500", _dark: "dark" }}
        >
          <StatsPieChart />
        </GridItem>

        {/* //$  ============================= Chart - Expense & Revenue ====================== */}
        <GridItem
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "gray.500", _dark: "#37415180" }}
          color={{ base: "gray.600", _dark: "gray.100" }}
          p={2}
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
          shadow={"sm"}
          overflowY="auto"
          height={"100%"}
          alignSelf={"start"}
        >
          <ApplicationCards />
        </GridItem>

        {/* //$  ============================= Table - Projects List =========================== */}
        <GridItem
          colSpan={{ base: 1, lg: 2, xl: 3 }}
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "gray.500", _dark: "#374151/80" }}
          minWidth="0"
          w="100%"
          p={4}
          borderRadius="md"
          marginBottom="auto"
          alignSelf={"start"}
          overflowY="auto"
          height={"100%"}
        >
          <ProjectSummaryTable />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardLayout;

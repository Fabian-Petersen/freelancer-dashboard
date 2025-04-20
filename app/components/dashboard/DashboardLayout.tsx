import { Box, Grid, GridItem } from "@chakra-ui/react";

// import MonthlyRevenueChart from "../charts/MonthlyRevenueChart";
import RevenueExpenseChart from "../charts/RevenueExpenseChart";
import ProjectSummaryTable from "../charts/ProjectSummaryTable";
// import ApplicationCards from "../charts/ApplicationCards";
import Cards from "../dashboardCards/Cards";
import TaskContainer from "../tasks/TasksContainer";

const DashboardLayout = () => {
  return (
    <Box
      px={4}
      color={{ base: "gray.700", _dark: "gray.700" }}
      width="100%"
      // border="1px dotted red"
    >
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        overflowX={{ base: "hidden" }}
        height="100%"
        gap={4}
      >
        {/* //$  ===================== Cards - Cards Indicating Current Status ================ */}
        <GridItem height="auto" colSpan={{ base: 2, lg: 3, xl: 4 }}>
          <Cards />
        </GridItem>

        {/* //$  ============================= Chart - Expense & Revenue ====================== */}
        <GridItem
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "white", _dark: "rgba(55, 65, 81, 0.5)" }}
          color={{ base: "gray.600", _dark: "gray.100" }}
          p={2}
          borderRadius="md"
          boxShadow="sm"
          height="300px"
          colSpan={{ base: 2, lg: 3 }}
        >
          <RevenueExpenseChart />
        </GridItem>
        {/* //$  ============================= Table - Tasks ========================= */}
        <GridItem
          rowSpan={2}
          colSpan={{ base: 2, lg: 1 }}
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "white", _dark: "rgba(55, 65, 81, 0.5)" }}
          borderRadius="md"
          p={4}
          shadow={"sm"}
          overflowY="auto"
          height={"100%"}
          alignSelf={"start"}
        >
          <TaskContainer />
        </GridItem>

        {/* //$  ============================= Table - Job Applications ========================= */}
        {/* <GridItem
          rowSpan={2}
          colSpan={{ base: 2, lg: 1 }}
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "white", _dark: "rgba(55, 65, 81, 0.5)" }}
          borderRadius="md"
          p={4}
          shadow={"sm"}
          overflowY="auto"
          height={"100%"}
          alignSelf={"start"}
        >
          <ApplicationCards />
        </GridItem> */}

        {/* //$  ============================= Table - Projects List =========================== */}
        <GridItem
          colSpan={{ base: 2, lg: 2, xl: 3 }}
          bg={{ base: "white", _dark: "#1d2739" }}
          borderColor={{ base: "white", _dark: "rgba(55, 65, 81, 0.5)" }}
          minWidth="0"
          w="100%"
          p={4}
          borderRadius="md"
          marginBottom="auto"
          alignSelf={"start"}
          overflowY="auto"
          height={"100%"}
          shadow={"sm"}
        >
          <ProjectSummaryTable />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardLayout;

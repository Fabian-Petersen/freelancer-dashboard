import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./components/dashboard/Sidebar";
import DashboardLayout from "./components/dashboard/DashboardLayout";

export default function Home() {
  return (
    <Grid as="main" width="100%" minHeight="100vh" templateColumns="233px 1fr">
      <GridItem width="100%" height="100%">
        <Sidebar />
      </GridItem>
      <GridItem bgColor={"gray.100"} height={"100vh"} width="100%">
        <DashboardLayout />
      </GridItem>
    </Grid>
  );
}

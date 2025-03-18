import { Metadata } from "next";
import CamlinLineChart from "../_components/CamlinLineChart";
import CamlinTable from "../_components/CamlinTable";
import { getLastTenVoltageReadings } from "../_lib/data-service";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Page() {
  const voltageReadings = await getLastTenVoltageReadings();
  return (
    <>
      <h1 className="text-4xl text-center p-6">Voltage Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid size={4}>
            <CamlinTable voltageReadings={voltageReadings} />
          </Grid>
          <Grid size={7}>
            <CamlinLineChart voltageReadings={voltageReadings} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Page;

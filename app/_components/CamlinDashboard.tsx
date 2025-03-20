"use client";
import dynamic from "next/dynamic";
const CamlinLineChart = dynamic(
  () => import("../_components/CamlinLineChart"),
  {
    ssr: false,
  }
);
//import CamlinLineChart from "../_components/CamlinLineChart";
import CamlinTable from "../_components/CamlinTable";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { voltageReadingProps } from "../_utils/voltageReadingType";

function CamlinDashboard({ voltageReadings }: voltageReadingProps) {
  return (
    <div>
      <a
        className="items-left"
        href="https://camlingroup.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/camlin-group-logo.svg"
          alt="Camlin"
          width={0}
          height={0}
          style={{ width: "120px", height: "auto" }}
          quality={90}
          priority
        />
      </a>
      <h1 className="text-4xl text-center p-6">Voltage Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid sx={{ padding: { xs: "20px", md: "40px" } }} size={4}>
            <CamlinTable voltageReadings={voltageReadings} />
          </Grid>
          <Grid sx={{ padding: { xs: "20px", md: "40px" } }} size={7}>
            <CamlinLineChart voltageReadings={voltageReadings} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default CamlinDashboard;

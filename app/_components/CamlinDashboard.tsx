"use client";
import dynamic from "next/dynamic";
const CamlinLineChart = dynamic(
  () => import("../_components/CamlinLineChart"),
  {
    ssr: false,
  }
);
//import CamlinLineChart from "../_components/CamlinLineChart";
const CamlinTable = dynamic(() => import("../_components/CamlinTable"), {
  ssr: false,
});
//import CamlinTable from "../_components/CamlinTable";
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

      <Grid container spacing={1} columns={{ xs: 6, sm: 12 }}>
        <Grid sx={{ padding: { xs: "10px", md: "10px" } }} size={5}>
          <CamlinTable voltageReadings={voltageReadings} />
        </Grid>
        <Grid sx={{ padding: { xs: "10px", md: "10px" } }} size={7}>
          <CamlinLineChart voltageReadings={voltageReadings} />
        </Grid>
      </Grid>
    </div>
  );
}

export default CamlinDashboard;

import { Metadata } from "next";
import CamlinDashboard from "../_components/CamlinDashboard";
import { getLastTenVoltageReadings } from "../_lib/data-service";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function Page() {
  const voltageReadings = await getLastTenVoltageReadings();
  return <CamlinDashboard voltageReadings={voltageReadings} />;
}

export default Page;

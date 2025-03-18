import Tooltip from "@mui/material/Tooltip";
import { FaHeartbeat } from "react-icons/fa";
import {
  healthStatusColorCRITICAL,
  healthStatusColorEXCELLENT,
  healthStatusColorFAIR,
  healthStatusColorGOOD,
  healthStatusColorPOOR,
} from "../_utils/healthStatusColors";

interface CamlinHealthStatusProps {
  healthStatus: string;
}

function CamlinHealthStatus({ healthStatus }: CamlinHealthStatusProps) {
  return (
    <Tooltip title={healthStatus}>
      <FaHeartbeat
        size={40}
        style={{
          display: "inline",
          padding: "8",
        }}
        color={`${
          healthStatus === "Critical"
            ? healthStatusColorCRITICAL
            : healthStatus == "Poor"
            ? healthStatusColorPOOR
            : healthStatus == "Fair"
            ? healthStatusColorFAIR
            : healthStatus == "Good"
            ? healthStatusColorGOOD
            : healthStatusColorEXCELLENT
        }`}
      />
    </Tooltip>
  );
}

export default CamlinHealthStatus;

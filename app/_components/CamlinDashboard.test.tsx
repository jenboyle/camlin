import { render, screen } from "@testing-library/react";
import CamlinDashboard from "./CamlinDashboard";

const sampleTest = [
  {
    assetId: 1,
    name: "Test1",
    region: "London",
    health: "Critical",
    lastTenVoltgageReadings: [
      { timestamp: "2024-07-21T00:00:00Z", voltage: "35234" },
      { timestamp: "2024-07-12T00:00:00Z", voltage: "27598" },
    ],
  },
  {
    assetId: 2,
    name: "Test2",
    region: "London",
    health: "Excellent",
    lastTenVoltgageReadings: [
      { timestamp: "2024-07-21T00:00:00Z", voltage: "35234" },
    ],
  },
];

global.ResizeObserver = jest.fn().mockImplementation(() => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  };
});

const dashboardHeader = "Voltage Dashboard";
test("Camlin Dashboard Renders", async () => {
  render(<CamlinDashboard voltageReadings={sampleTest} />);
  expect((await screen.findByText(dashboardHeader)).textContent).toContain(
    dashboardHeader
  );
});

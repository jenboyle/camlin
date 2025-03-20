import { render, screen } from "@testing-library/react";
import CamlinLineChart from "./CamlinLineChart";
import userEvent from "@testing-library/user-event";

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

const lineChartHeader = "Last Ten Voltage Readings";
test("Camlin Line Chart Renders", async () => {
  render(<CamlinLineChart voltageReadings={sampleTest} />);
  expect((await screen.findByText(lineChartHeader)).textContent).toContain(
    lineChartHeader
  );
});

const checkboxOption1 = "Test1";
test("Camlin Line Chart Toggle option", async () => {
  render(<CamlinLineChart voltageReadings={sampleTest} />);
  const checkbox = await screen.getByLabelText(checkboxOption1);
  expect(checkbox).toBeChecked();
  await userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

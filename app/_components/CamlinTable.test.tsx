import { render, screen } from "@testing-library/react";
import CamlinTable from "./CamlinTable";
import userEvent from "@testing-library/user-event";

const sampleTest = [
  {
    assetId: 1,
    name: "TestA",
    region: "London",
    health: "Good",
    lastTenVoltgageReadings: [
      { timestamp: "2024-07-21T00:00:00Z", voltage: "35234" },
      { timestamp: "2024-07-12T00:00:00Z", voltage: "27598" },
    ],
  },
  {
    assetId: 2,
    name: "TestB",
    region: "Glasgow",
    health: "Poor",
    lastTenVoltgageReadings: [
      { timestamp: "2024-07-21T00:00:00Z", voltage: "123" },
    ],
  },
  {
    assetId: 3,
    name: "TestC",
    region: "Liverpool",
    health: "Fair",
    lastTenVoltgageReadings: [
      { timestamp: "2024-07-21T00:00:00Z", voltage: "12345" },
    ],
  },
  {
    assetId: 4,
    name: "TestD",
    region: "Oxford",
    health: "Critical",
    lastTenVoltgageReadings: [
      { timestamp: "2024-07-21T00:00:00Z", voltage: "122" },
    ],
  },
];

const voltageText = "Regional Health";
test("Camlin Table Renders", async () => {
  render(<CamlinTable voltageReadings={sampleTest} />);
  expect((await screen.findByText(voltageText)).textContent).toContain(
    voltageText
  );
});

const nameSortTestId = "nameSort";
test("Camlin Table Sorting by Name icon changes", async () => {
  render(<CamlinTable voltageReadings={sampleTest} />);
  const nameSort = await screen.findByTestId(nameSortTestId);
  const contents = nameSort.textContent;
  await userEvent.click(nameSort);
  let contentsAfter = await screen.findByTestId(nameSortTestId);
  expect(contents).not.toEqual(contentsAfter);
  await userEvent.click(nameSort);
  contentsAfter = await screen.findByTestId(nameSortTestId);
  expect(contents).not.toEqual(contentsAfter);
});

const regionSortTestId = "regionSort";
test("Camlin Table Sorting by Region icon changes", async () => {
  render(<CamlinTable voltageReadings={sampleTest} />);
  const regionSort = await screen.findByTestId(regionSortTestId);
  const contents = regionSort.textContent;
  await userEvent.click(regionSort);
  let contentsAfter = await screen.findByTestId(regionSortTestId);
  expect(contents).not.toEqual(contentsAfter);
  await userEvent.click(regionSort);
  contentsAfter = await screen.findByTestId(regionSortTestId);
  expect(contents).not.toEqual(contentsAfter);
});

const healthSortTestId = "healthSort";
test("Camlin Table Sorting by Health icon changes", async () => {
  render(<CamlinTable voltageReadings={sampleTest} />);
  const healthSort = await screen.findByTestId(healthSortTestId);
  const contents = healthSort.textContent;
  await userEvent.click(healthSort);
  let contentsAfter = await screen.findByTestId(healthSortTestId);
  expect(contents).not.toEqual(contentsAfter);
  await userEvent.click(healthSort);
  contentsAfter = await screen.findByTestId(healthSortTestId);
  expect(contents).not.toEqual(contentsAfter);
});

const healthAlert = "Health Alert";
test("Camlin Table Toggle High Importance", async () => {
  render(<CamlinTable voltageReadings={sampleTest} />);
  const checkbox = await screen.getByLabelText(healthAlert);
  expect(checkbox).not.toBeChecked();
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  expect(await screen.findByTestId("row_TestB")).not.toBe(null);
  expect(await screen.findByTestId("row_TestD")).not.toBe(null);

  expect(screen.queryByTestId("row_TestB")).not.toBeNull();
  expect(screen.queryByTestId("row_TestD")).not.toBeNull();
  expect(screen.queryByTestId("row_TestA")).toBeNull();
  expect(screen.queryByTestId("row_TestC")).toBeNull();

  await userEvent.click(checkbox);

  expect(screen.queryByTestId("row_TestA")).not.toBeNull();
  expect(screen.queryByTestId("row_TestB")).not.toBeNull();
  expect(screen.queryByTestId("row_TestC")).not.toBeNull();
  expect(screen.queryByTestId("row_TestD")).not.toBeNull();
});

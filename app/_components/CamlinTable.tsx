"use client";
import Table from "@mui/material/Table";
import { voltageReadingProps } from "../_utils/voltageReadingType";
import CamlinHealthStatus from "./CamlinHealthStatus";
import Card from "@mui/material/Card";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import { ChangeEvent, useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

// const todoTemp = [
//   {
//     assetId: 1,
//     name: "Transformer Alpha",
//     region: "London",
//     health: "Good",
//     lastTenVoltgageReadings: [
//       { timestamp: "2024-07-21T00:00:00Z", voltage: "35234" },
//       { timestamp: "2024-07-20T00:00:00Z", voltage: "29098" },
//       { timestamp: "2024-07-19T00:00:00Z", voltage: "33456" },
//       { timestamp: "2024-07-18T00:00:00Z", voltage: "35123" },
//       { timestamp: "2024-07-17T00:00:00Z", voltage: "23542" },
//       { timestamp: "2024-07-16T00:00:00Z", voltage: "39107" },
//       { timestamp: "2024-07-15T00:00:00Z", voltage: "35360" },
//       { timestamp: "2024-07-14T00:00:00Z", voltage: "33245" },
//       { timestamp: "2024-07-13T00:00:00Z", voltage: "31244" },
//       { timestamp: "2024-07-12T00:00:00Z", voltage: "27598" },
//     ],
//   },
//   {
//     assetId: 2,
//     name: "Transformer Bravo",
//     region: "Manchester",
//     health: "Excellent",
//     lastTenVoltgageReadings: [
//       { timestamp: "2024-07-21T00:00:00Z", voltage: "40234" },
//       { timestamp: "2024-07-20T00:00:00Z", voltage: "39098" },
//       { timestamp: "2024-07-19T00:00:00Z", voltage: "39456" },
//       { timestamp: "2024-07-18T00:00:00Z", voltage: "38123" },
//       { timestamp: "2024-07-17T00:00:00Z", voltage: "40542" },
//       { timestamp: "2024-07-16T00:00:00Z", voltage: "39907" },
//       { timestamp: "2024-07-15T00:00:00Z", voltage: "38560" },
//       { timestamp: "2024-07-14T00:00:00Z", voltage: "39345" },
//       { timestamp: "2024-07-13T00:00:00Z", voltage: "41234" },
//       { timestamp: "2024-07-12T00:00:00Z", voltage: "37598" },
//     ],
//   },
//   {
//     assetId: 3,
//     name: "Transformer Charlie",
//     region: "Glasgow",
//     health: "Fair",
//     lastTenVoltgageReadings: [
//       { timestamp: "2024-07-21T00:00:00Z", voltage: "32010" },
//       { timestamp: "2024-07-20T00:00:00Z", voltage: "31500" },
//       { timestamp: "2024-07-19T00:00:00Z", voltage: "26002" },
//       { timestamp: "2024-07-18T00:00:00Z", voltage: "29540" },
//       { timestamp: "2024-07-17T00:00:00Z", voltage: "26045" },
//       { timestamp: "2024-07-16T00:00:00Z", voltage: "23523" },
//       { timestamp: "2024-07-15T00:00:00Z", voltage: "27682" },
//       { timestamp: "2024-07-14T00:00:00Z", voltage: "26013" },
//       { timestamp: "2024-07-13T00:00:00Z", voltage: "31173" },
//       { timestamp: "2024-07-12T00:00:00Z", voltage: "28135" },
//     ],
//   },
//   {
//     assetId: 4,
//     name: "Transformer Delta",
//     region: "London",
//     health: "Poor",
//     lastTenVoltgageReadings: [
//       { timestamp: "2024-07-21T00:00:00Z", voltage: "22110" },
//       { timestamp: "2024-07-20T00:00:00Z", voltage: "31020" },
//       { timestamp: "2024-07-19T00:00:00Z", voltage: "26021" },
//       { timestamp: "2024-07-18T00:00:00Z", voltage: "25406" },
//       { timestamp: "2024-07-17T00:00:00Z", voltage: "20645" },
//       { timestamp: "2024-07-16T00:00:00Z", voltage: "23243" },
//       { timestamp: "2024-07-15T00:00:00Z", voltage: "27812" },
//       { timestamp: "2024-07-14T00:00:00Z", voltage: "26123" },
//       { timestamp: "2024-07-13T00:00:00Z", voltage: "31713" },
//       { timestamp: "2024-07-12T00:00:00Z", voltage: "21235" },
//     ],
//   },
//   {
//     assetId: 5,
//     name: "Transformer Echo",
//     region: "Manchester",
//     health: "Critical",
//     lastTenVoltgageReadings: [
//       { timestamp: "2024-07-21T00:00:00Z", voltage: "18031" },
//       { timestamp: "2024-07-20T00:00:00Z", voltage: "21052" },
//       { timestamp: "2024-07-19T00:00:00Z", voltage: "20285" },
//       { timestamp: "2024-07-18T00:00:00Z", voltage: "21317" },
//       { timestamp: "2024-07-17T00:00:00Z", voltage: "19123" },
//       { timestamp: "2024-07-16T00:00:00Z", voltage: "19644" },
//       { timestamp: "2024-07-15T00:00:00Z", voltage: "18345" },
//       { timestamp: "2024-07-14T00:00:00Z", voltage: "21564" },
//       { timestamp: "2024-07-13T00:00:00Z", voltage: "22245" },
//       { timestamp: "2024-07-12T00:00:00Z", voltage: "20102" },
//     ],
//   },
// ];

function CamlinTable({ voltageReadings }: voltageReadingProps) {
  const [voltageReadingsFiltered, setVoltageReadingsFiltered] =
    useState(voltageReadings);
  const [highImportance, setHighImportance] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [nameSort, setNameSort] = useState("");
  const [regionSort, setRegionSort] = useState("");
  const [healthSort, setHealthSort] = useState("");

  const HEALTH_SORT_ORDER = ["excellent", "good", "fair", "poor", "critical"];

  function handleHealthSort() {
    setRegionSort("");
    setNameSort("");
    if (healthSort == "" || healthSort == "desc") {
      setHealthSort("asc");

      //const sortByCondition = (a, b) => HEALTH_SORT_ORDER.indexOf(a.health.toLowerCase()) - HEALTH_SORT_ORDER.indexOf(b.health.toLowerCase());

      //setVoltageReadingsFiltered([...voltageReadingsFiltered].sort(sortByCondition));

      voltageReadingsFiltered.sort(function (a, b) {
        if (
          HEALTH_SORT_ORDER.indexOf(a.health.toLowerCase()) <
          HEALTH_SORT_ORDER.indexOf(b.health.toLowerCase())
        )
          return -1;
        if (
          HEALTH_SORT_ORDER.indexOf(a.health.toLowerCase()) >
          HEALTH_SORT_ORDER.indexOf(b.health.toLowerCase())
        )
          return 1;
        return 0;
      });
    } else if (healthSort == "asc") {
      setHealthSort("desc");
      voltageReadingsFiltered.sort(function (a, b) {
        if (
          HEALTH_SORT_ORDER.indexOf(a.health.toLowerCase()) >
          HEALTH_SORT_ORDER.indexOf(b.health.toLowerCase())
        )
          return -1;
        if (
          HEALTH_SORT_ORDER.indexOf(a.health.toLowerCase()) <
          HEALTH_SORT_ORDER.indexOf(b.health.toLowerCase())
        )
          return 1;
        return 0;
      });
    }
  }

  function handleNameSort() {
    setRegionSort("");
    setHealthSort("");
    if (nameSort == "" || nameSort == "desc") {
      setNameSort("asc");
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
    } else if (nameSort == "asc") {
      setNameSort("desc");
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      });
    }
  }

  function handleRegionSort() {
    setNameSort("");
    setHealthSort("");
    if (regionSort == "" || regionSort == "desc") {
      setRegionSort("asc");
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.region.toLowerCase() < b.region.toLowerCase()) return -1;
        if (a.region.toLowerCase() > b.region.toLowerCase()) return 1;
        return 0;
      });
    } else if (regionSort == "asc") {
      setRegionSort("desc");
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.region.toLowerCase() > b.region.toLowerCase()) return -1;
        if (a.region.toLowerCase() < b.region.toLowerCase()) return 1;
        return 0;
      });
    }
  }

  function handleFilterHighImportance() {
    const highImp = !highImportance;
    setHighImportance(highImp);
    if (highImp) {
      setVoltageReadingsFiltered(
        voltageReadingsFiltered.filter(
          (reading) => reading.health == "Critical" || reading.health == "Poor"
        )
      );
    } else {
      setVoltageReadingsFiltered(voltageReadings);
      setSearchText("");
    }
  }

  function handleFilterReadings(e: ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    if (highImportance) {
      setHighImportance(false);
    }
    if (e.target.value.length > 2) {
      setVoltageReadingsFiltered(
        voltageReadings.filter(
          (reading) =>
            reading.name.toUpperCase().indexOf(e.target.value.toUpperCase()) !=
              -1 ||
            reading.region
              .toUpperCase()
              .indexOf(e.target.value.toUpperCase()) != -1 ||
            reading.health
              .toUpperCase()
              .indexOf(e.target.value.toUpperCase()) != -1
        )
      );
    } else {
      setVoltageReadingsFiltered(voltageReadings);
    }
  }

  return (
    <>
      <Card variant="outlined">
        <Input
          placeholder="Search"
          inputProps={{ "aria-label": "description" }}
          onChange={handleFilterReadings}
          value={searchText}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <FormControlLabel
          value="end"
          control={
            <Checkbox
              onClick={handleFilterHighImportance}
              sx={{
                color: "#ff0000",
                "&.Mui-checked": {
                  color: "#ff0000",
                },
              }}
              checked={highImportance}
            />
          }
          label="Health Alert"
          labelPlacement="start"
        />

        <Table sx={{ minWidth: 350 }} aria-label="Regional Health">
          <caption className="text-2xl p-3">Regional Health</caption>
          <TableHead>
            <TableRow>
              <TableCell>
                Name{" "}
                {nameSort == "asc" ? (
                  <FaSortDown onClick={handleNameSort} />
                ) : nameSort == "desc" ? (
                  <FaSortUp onClick={handleNameSort} />
                ) : (
                  <TiArrowUnsorted onClick={handleNameSort} />
                )}
              </TableCell>
              <TableCell>
                Region
                {regionSort == "asc" ? (
                  <FaSortDown onClick={handleRegionSort} />
                ) : regionSort == "desc" ? (
                  <FaSortUp onClick={handleRegionSort} />
                ) : (
                  <TiArrowUnsorted onClick={handleRegionSort} />
                )}
              </TableCell>
              <TableCell>
                Health{" "}
                {healthSort == "asc" ? (
                  <FaSortDown onClick={handleHealthSort} />
                ) : healthSort == "desc" ? (
                  <FaSortUp onClick={handleHealthSort} />
                ) : (
                  <TiArrowUnsorted onClick={handleHealthSort} />
                )}
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {voltageReadingsFiltered.map((record) => (
              <TableRow key={record.assetId}>
                <TableCell className="p-1 text-center">{record.name}</TableCell>
                <TableCell className="p-1 text-center">
                  {record.region}
                </TableCell>
                <TableCell className="p-1 text-center">
                  <CamlinHealthStatus healthStatus={record.health} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
}

export default CamlinTable;

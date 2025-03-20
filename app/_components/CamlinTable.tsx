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
import { ChangeEvent, useEffect, useState } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { useLocalStorage } from "usehooks-ts";

function CamlinTable({ voltageReadings }: voltageReadingProps) {
  const [sort, setSort] = useLocalStorage(
    "sort",
    { healthSort: "", nameSort: "", regionSort: "" },
    { initializeWithValue: false }
  );
  const [persistedSearchText, setPersistedSearchText] = useLocalStorage(
    "search",
    { search: "" },
    { initializeWithValue: false }
  );
  const [persistedHighImportance, setPersistedHighImportance] = useLocalStorage(
    "highimportance",
    { highimportance: false },
    { initializeWithValue: false }
  );

  const [voltageReadingsFiltered, setVoltageReadingsFiltered] =
    useState(voltageReadings);

  const HEALTH_SORT_ORDER = ["excellent", "good", "fair", "poor", "critical"];

  //onChange={() => sortNameDir(sort.nameSort)}

  useEffect(() => {
    function checkSort() {
      if (
        localStorage.getItem("sort") != undefined &&
        localStorage.getItem("sort")!.length != 0
      ) {
        const obj = JSON.parse(localStorage.getItem("sort")!);
        const updatedSort = sort;
        if (obj.healthSort.length != 0) {
          updatedSort.nameSort = "";
          updatedSort.regionSort = "";
          updatedSort.healthSort = obj.healthSort;
          setSort(updatedSort);
          sortHealthDir(obj.healthSort);
        } else if (obj.regionSort.length != 0) {
          updatedSort.nameSort = "";
          updatedSort.regionSort = obj.regionSort;
          updatedSort.healthSort = "";
          setSort(updatedSort);
          sortRegionDir(obj.regionSort);
        } else if (obj.nameSort.length != 0) {
          updatedSort.nameSort = obj.nameSort;
          updatedSort.regionSort = "";
          updatedSort.healthSort = "";
          setSort(updatedSort);
          sortNameDir(obj.nameSort);
        }
      }
    }
    checkSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function checkSearch() {
      if (
        localStorage.getItem("search") != undefined &&
        localStorage.getItem("search")!.length != 0
      ) {
        const obj = JSON.parse(localStorage.getItem("search")!);
        if (obj.search.length != 0) {
          searchFilter(obj.search);
        }
      }
    }
    checkSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function checkHighAlert() {
      if (localStorage.getItem("highimportance") != undefined) {
        const obj = JSON.parse(localStorage.getItem("highimportance")!);
        setPersistedHighImportance(obj);
        filterHighImportance(obj.highimportance);
      }
    }
    checkHighAlert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sortHealthDir(direction: string) {
    if (direction == "asc") {
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
    } else {
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

  function handleHealthSort() {
    const updatedSort = sort;
    updatedSort.nameSort = "";
    updatedSort.regionSort = "";
    if (sort.healthSort == "" || sort.healthSort == "desc") {
      updatedSort.healthSort = "asc";
    } else {
      updatedSort.healthSort = "desc";
    }
    setSort(updatedSort);
    sortHealthDir(updatedSort.healthSort);
  }

  function sortNameDir(direction: string) {
    if (direction == "asc") {
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
    } else {
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      });
    }
  }

  function handleNameSort() {
    const updatedSort = sort;
    updatedSort.healthSort = "";
    updatedSort.regionSort = "";
    if (sort.nameSort == "" || sort.nameSort == "desc") {
      updatedSort.nameSort = "asc";
    } else {
      updatedSort.nameSort = "desc";
    }
    setSort(updatedSort);
    sortNameDir(updatedSort.nameSort);
  }

  function sortRegionDir(direction: string) {
    if (direction == "asc") {
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.region.toLowerCase() < b.region.toLowerCase()) return -1;
        if (a.region.toLowerCase() > b.region.toLowerCase()) return 1;
        return 0;
      });
    } else {
      voltageReadingsFiltered.sort(function (a, b) {
        if (a.region.toLowerCase() > b.region.toLowerCase()) return -1;
        if (a.region.toLowerCase() < b.region.toLowerCase()) return 1;
        return 0;
      });
    }
  }

  function handleRegionSort() {
    const updatedSort = sort;
    updatedSort.healthSort = "";
    updatedSort.nameSort = "";
    if (sort.regionSort == "" || sort.regionSort == "desc") {
      updatedSort.regionSort = "asc";
    } else if (sort.regionSort == "asc") {
      updatedSort.regionSort = "desc";
    }
    setSort(updatedSort);
    sortRegionDir(updatedSort.regionSort);
  }

  function handleFilterHighImportance() {
    const highImp = persistedHighImportance;
    highImp.highimportance = !highImp.highimportance;
    setPersistedHighImportance(highImp);
    filterHighImportance(highImp.highimportance);
  }

  function filterHighImportance(highImp: boolean) {
    if (highImp) {
      setVoltageReadingsFiltered(
        voltageReadingsFiltered.filter(
          (reading) => reading.health == "Critical" || reading.health == "Poor"
        )
      );
    } else {
      setVoltageReadingsFiltered(voltageReadings);
      const updatedSearch = persistedSearchText;
      updatedSearch.search = "";
      setPersistedSearchText(updatedSearch);
    }
  }

  function handleFilterReadings(e: ChangeEvent<HTMLInputElement>) {
    const updatedSearch = persistedSearchText;
    updatedSearch.search = e.target.value;
    setPersistedSearchText(updatedSearch);
    if (persistedHighImportance) {
      const highImp = persistedHighImportance;
      highImp.highimportance = false;
      setPersistedHighImportance(highImp);
    }
    if (e.target.value.length > 2) {
      searchFilter(e.target.value);
    } else {
      setVoltageReadingsFiltered(voltageReadings);
    }
  }

  function searchFilter(search: string) {
    const updatedSearch = persistedSearchText;
    updatedSearch.search = search;
    setPersistedSearchText(updatedSearch);
    setVoltageReadingsFiltered(
      voltageReadings.filter(
        (reading) =>
          reading.name.toUpperCase().indexOf(search.toUpperCase()) != -1 ||
          reading.region.toUpperCase().indexOf(search.toUpperCase()) != -1 ||
          reading.health.toUpperCase().indexOf(search.toUpperCase()) != -1
      )
    );
  }

  return (
    <Card variant="outlined" style={{ maxWidth: "100vw", overflow: "auto" }}>
      <Input
        placeholder="Search"
        inputProps={{ "aria-label": "description" }}
        onChange={handleFilterReadings}
        value={persistedSearchText.search}
        sx={{ marginLeft: { xs: "5px", md: "10px" } }}
      />
      <IconButton type="button" sx={{ p: "1px" }} aria-label="search">
        <SearchIcon />
      </IconButton>

      <FormControlLabel
        value="end"
        control={
          <Checkbox
            onChange={handleFilterHighImportance}
            sx={{
              color: "#ff0000",
              "&.Mui-checked": {
                color: "#ff0000",
              },
            }}
            checked={persistedHighImportance.highimportance}
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
              <span data-testid="nameSort" onClick={handleNameSort}>
                Name{" "}
                {sort.nameSort == "asc" ? (
                  <FaSortDown onChange={() => sortNameDir(sort.nameSort)} />
                ) : sort.nameSort == "desc" ? (
                  <FaSortUp onChange={() => sortNameDir(sort.nameSort)} />
                ) : (
                  <TiArrowUnsorted
                    onChange={() => sortNameDir(sort.nameSort)}
                  />
                )}
              </span>
            </TableCell>
            <TableCell>
              <span data-testid="regionSort" onClick={handleRegionSort}>
                Region{" "}
                {sort.regionSort == "asc" ? (
                  <FaSortDown />
                ) : sort.regionSort == "desc" ? (
                  <FaSortUp />
                ) : (
                  <TiArrowUnsorted />
                )}
              </span>
            </TableCell>
            <TableCell>
              <span data-testid="healthSort" onClick={handleHealthSort}>
                Health{" "}
                {sort.healthSort == "asc" ? (
                  <FaSortDown />
                ) : sort.healthSort == "desc" ? (
                  <FaSortUp />
                ) : (
                  <TiArrowUnsorted />
                )}
              </span>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {voltageReadingsFiltered.map((record) => (
            <TableRow key={record.assetId} data-testid={`row_${record.name}`}>
              <TableCell className="p-1 text-center">{record.name}</TableCell>
              <TableCell className="p-1 text-center">{record.region}</TableCell>
              <TableCell className="p-1 text-center">
                <CamlinHealthStatus healthStatus={record.health} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

export default CamlinTable;

"use client";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { chartStrokeColors } from "../_utils/chartStrokeColors";
import {
  voltageReadingProps,
  voltageReadingType,
} from "../_utils/voltageReadingType";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

function CamlinLineChart({ voltageReadings }: voltageReadingProps) {
  const [toggleMap, setToggleMap] = useState(new Map());

  const [persistedCheckboxes, setPersistedCheckboxes] = useLocalStorage(
    "transformers",
    {
      transformers: voltageReadings.map((reading) => {
        return new Map(
          toggleMap.set(
            reading.name,
            localStorage.getItem("transformers")
              ? JSON.parse(localStorage.getItem("transformers")!)[reading.name]
              : true
          )
        );
      }),
    },
    { initializeWithValue: false }
  );

  useEffect(() => {
    if (
      localStorage != undefined &&
      localStorage.getItem("transformers") != undefined &&
      localStorage.getItem("transformers")!.length != 0
    ) {
      const obj = JSON.parse(localStorage.getItem("transformers")!);
      voltageReadings.map((reading) => {
        const updatedToggleMap = new Map(
          toggleMap.set(reading.name, obj[reading.name])
        );
        setToggleMap(updatedToggleMap);
        setPersistedCheckboxes(Object.fromEntries(updatedToggleMap));
      });
    } else {
      voltageReadings.map((reading) => {
        const updatedToggleMap = new Map(toggleMap.set(reading.name, true));
        setToggleMap(updatedToggleMap);
        setPersistedCheckboxes(Object.fromEntries(updatedToggleMap));
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTransformerReadingToggle(
    e: ChangeEvent<HTMLInputElement>,
    reading: voltageReadingType
  ) {
    const updatedToggleMap = new Map(
      toggleMap.set(reading.name, (e.target as HTMLInputElement).checked)
    );
    setToggleMap(updatedToggleMap);

    //console.log(toggleMap);
    //console.log(JSON.parse(JSON.stringify(persistedCheckboxes)));

    setPersistedCheckboxes(Object.fromEntries(updatedToggleMap));
  }

  //checked={persistedCheckboxes.transformers.get(reading.name)}
  return (
    <Card variant="outlined">
      <span className="inline">
        <p className="text-2xl text-center p-3">Last Ten Voltage Readings</p>
        {voltageReadings.map((reading) => (
          <FormControlLabel
            key={reading.assetId}
            value={reading.name}
            control={
              <Checkbox
                value={reading.name}
                onChange={(e) => handleTransformerReadingToggle(e, reading)}
                checked={toggleMap.get(reading.name)}
              />
            }
            label={reading.name}
            labelPlacement="start"
          />
        ))}
        <ResponsiveContainer height={300} width="90%">
          <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              allowDuplicatedCategory={false}
              tickFormatter={(time) => new Date(time).toLocaleDateString()}
              label={{
                value: `Date`,
                style: { textAnchor: "middle" },
                angle: 0,
                position: "left",
                offset: 0,
              }}
            />

            <YAxis
              dataKey="voltage"
              label={{
                value: `Voltage (V)`,
                style: { textAnchor: "middle" },
                angle: -90,
                position: "left",
                offset: 10,
              }}
            />
            <Tooltip labelFormatter={(t) => new Date(t).toLocaleString()} />
            <Legend />
            <div>{JSON.stringify(persistedCheckboxes.transformers)}</div>
            {voltageReadings.map((s, index) =>
              toggleMap.get(s.name) ? (
                <Line
                  type="monotone"
                  dataKey="voltage"
                  data={s.lastTenVoltgageReadings}
                  name={s.name}
                  key={s.name}
                  stroke={
                    index < 5 ? chartStrokeColors[index] : chartStrokeColors[0]
                  }
                  activeDot={{ r: 8 }}
                />
              ) : null
            )}
          </LineChart>
        </ResponsiveContainer>
      </span>
    </Card>
  );
}

export default CamlinLineChart;

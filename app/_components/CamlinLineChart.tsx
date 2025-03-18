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

function CamlinLineChart({ voltageReadings }: voltageReadingProps) {
  const [toggleMap, setToggleMap] = useState(new Map());

  useEffect(() => {
    voltageReadings.map((reading) => {
      setToggleMap(
        (prevToggleMap) => new Map(prevToggleMap.set(reading.name, true))
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTransformerReadingToggle(
    e: ChangeEvent<HTMLInputElement>,
    reading: voltageReadingType
  ) {
    setToggleMap(
      (prevToggleMap) =>
        new Map(
          prevToggleMap.set(
            reading.name,
            (e.target as HTMLInputElement).checked
          )
        )
    );
  }
  //   function handleTransformerReadingToggle(e: MouseEvent<HTMLButtonElement>) {
  // if(e.target.value)
  //   }
  //onClick={handleTransformerReadingToggle}
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
                defaultChecked
                onChange={(e) => handleTransformerReadingToggle(e, reading)}
              />
            }
            label={reading.name}
            labelPlacement="start"
          />
        ))}
        <ResponsiveContainer height={300} width={700}>
          <LineChart
            width={730}
            height={250}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
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
            <Tooltip />
            <Legend />

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

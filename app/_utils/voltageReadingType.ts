type lastTenVoltageReadingsType = {
  timestamp: string;
  voltage: string;
};

export type voltageReadingType = {
  assetId: number;
  name: string;
  region: string;
  health: string;
  lastTenVoltgageReadings: lastTenVoltageReadingsType[];
};

export interface voltageReadingProps {
  voltageReadings: voltageReadingType[];
}

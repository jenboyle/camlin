import { supabase } from "./supabase";

export async function getLastTenVoltageReadings() {
  const { data, error } = await supabase.storage
    .from("temp")
    .download("sampledata.json");

  if (error) {
    throw new Error("Unable to retrieve");
  } else {
    const text = await data.text();
    return JSON.parse(text);
  }
}

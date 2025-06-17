import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";
import type { Location } from "@/types/apiTypes";

const LOCATIONS_URL_PATH = "/locations";

export default function useLocations(): Location[] | null {
  const [locations, setLocations] = useState<Location[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetch = async () => {
      const locations = await fetchLocations(controller);
      setLocations(locations);
    };

    fetch();

    return () => controller.abort();
  }, []);

  return locations;
}

async function fetchLocations(
  controller: AbortController
): Promise<Location[]> {
  const signal = controller.signal;
  try {
    const response = await axios.get(LOCATIONS_URL_PATH, { signal });

    return response.data;
  } catch (error) {
    if (!signal.aborted) {
      console.error("Error fetching locations:", error);
    }
    return [];
  }
}

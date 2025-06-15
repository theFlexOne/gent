import { useEffect, useState } from "react";
import axios from "axios";
import type { Location } from "@/types";

const LOCATIONS_URL = "http://localhost:8080/api/locations";

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
    const response = await axios.get(LOCATIONS_URL, { signal });

    return response.data;
  } catch (error) {
    if (!signal.aborted) {
      console.error("Error fetching locations:", error);
    }
    return [];
  }
}

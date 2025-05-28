import { useEffect, useState } from "react";
import axios from "axios";
import type { Location, LocationAddress } from "@/types";

const LOCATIONS_URL = "http://localhost:3000/locations";
const LOCATION_ADDRESSES_URL = "http://localhost:3000/locationAddresses";
const LOCATION_HOURS_URL = "http://localhost:3000/locationHours";

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
    const [locationResponse, addressResponse] = await Promise.all([
      axios.get(LOCATIONS_URL, { signal }),
      axios.get(LOCATION_ADDRESSES_URL, { signal }),
      axios.get(LOCATION_HOURS_URL, { signal }),
    ]);

    const locations = locationResponse.data.map((location: Location) => {
      location.id = +location.id;
      const address = addressResponse.data.find((address: LocationAddress) => {
        address.id = +address.id;
        address.locationId = +address.locationId;
        return address.locationId === location.id;
      });
      const hours = locationResponse.data.find(
        (hour: Location) => hour.id === location.id
      );

      return {
        ...location,
        address,
        hours,
      };
    });
    return locations;
  } catch (error) {
    if (!signal.aborted) {
      console.error("Error fetching locations:", error);
    }
    return [];
  }
}

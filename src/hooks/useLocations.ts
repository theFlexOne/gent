import { useEffect, useState } from "react";
import axios from "axios";
import type { Location, LocationAddress } from "@/types";

export default function useLocations() {
  const [locations, setLocations] = useState<Location[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await Promise.all([
          axios.get("http://localhost:3000/locations", { signal }),
          axios.get("http://localhost:3000/locationAddresses", { signal }),
        ]);
        const locations = response[0].data.map((location: Location) => {
          location.id = +location.id;
          const address = response[1].data.find((address: LocationAddress) => {
            address.id = +address.id;
            address.locationId = +address.locationId;
            return address.locationId === location.id;
          });
          return {
            ...location,
            address,
          };
        });
        setLocations(locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
      return () => controller.abort();
    })();
  }, []);

  return locations;
}

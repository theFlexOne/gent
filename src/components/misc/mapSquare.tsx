import { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import axios from "axios";

export default function MapSquare(props: React.HTMLProps<HTMLDivElement>) {
  // const [closestLocation, setClosestLocation] = useState<any>();

  useEffect(() => {
    (async () => {
      const { lat, lon, error } = await getUserPosition();
      if (error) {
        console.error(error);
        return;
      }
      console.log({ lat, lon });

      const closest = await getClosestLocation(lat, lon);
    })();
  }, []);

  return (
    <div {...props}>
      {/* {closestLocation && (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100%", aspectRatio: "1/1" }}
            defaultCenter={{
              lat: closestLocation.lat,
              lng: closestLocation.lon,
            }}
            defaultZoom={12}
            disableDefaultUI
          />
        </APIProvider>
      )} */}
    </div>
  );
}

async function getUserPosition(
  timesExecuted = 0
): Promise<{ lat: number; lon: number; error?: string }> {
  const url = new URL(import.meta.env.VITE_GOOGLE_GEOLOCATE_API_URL);
  url.searchParams.set("key", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });
    const data = await response.json();
    return {
      lat: data.location.lat,
      lon: data.location.lng,
    };
  } catch (error) {
    if (timesExecuted < 3) {
      return getUserPosition(++timesExecuted);
    }
    return { lat: 0, lon: 0, error: error as string };
  }
}

async function getClosestLocation(
  lat: number,
  lon: number
): Promise<{ lat: number; lon: number; error?: string }> {
  try {
    const response = await axios({
      method: "post",
      url: import.meta.env.VITE_GOOGLE_PLACES_API_URL,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.location",
      },
      data: {
        textQuery: "Gent Salon",
        maxResultCount: 1,
        locationBias: {
          circle: {
            center: {
              latitude: lat,
              longitude: lon,
            },
            radius: 1000.0,
          },
        },
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
    return { lat: 0, lon: 0, error: error as string };
  }

  return { lat: 0, lon: 0 };
}

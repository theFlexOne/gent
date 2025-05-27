import { useEffect, useState } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import axios from "axios";

const GOOGLE_PLACES_API_URL =
  "https://places.googleapis.com/v1/places:searchText";
const GOOGLE_GEOLOCATE_API_URL =
  "https://www.googleapis.com/geolocation/v1/geolocate";

export default function MapSquare({
  className,
  address,
}: {
  className?: string;
  address?: string;
}) {
  const [closestLocation, setClosestLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (!address) {
      (async () => {
        const { lat, lng, error } = await getUserPosition();
        if (error) {
          console.error(error);
          return;
        }
        const closest = await getClosestLocation(lat, lng);
        setClosestLocation({
          lat: closest.lat,
          lng: closest.lng,
        });
      })();
    } else {
      (async () => {
        const { lat, lng, error } = await getLocation(address);
        if (error) {
          console.error(error);
          return;
        }
        setClosestLocation({
          lat: lat,
          lng: lng,
        });
      })();
    }
  }, [address]);

  return (
    <div className={className}>
      {closestLocation && (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            style={{ width: "100%", aspectRatio: "1/1" }}
            defaultCenter={closestLocation}
            defaultZoom={12}
            disableDefaultUI
            mapId={"GENT_CUTS_AND_GROOMING"}
          >
            <AdvancedMarker
              position={closestLocation}
              title={"Gent Cuts and Grooming"}
            />
          </Map>
        </APIProvider>
      )}
    </div>
  );
}

async function getUserPosition(
  timesExecuted = 0
): Promise<{ lat: number; lng: number; error?: string }> {
  const url = new URL(GOOGLE_GEOLOCATE_API_URL);
  url.searchParams.set("key", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  try {
    const response = await axios({
      method: "post",
      url: url.href,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      lat: response.data.location.lat,
      lng: response.data.location.lng,
    };
  } catch (error) {
    if (timesExecuted < 3) {
      return getUserPosition(++timesExecuted);
    }
    return { lat: 0, lng: 0, error: error as string };
  }
}

async function getClosestLocation(
  lat: number,
  lng: number
): Promise<{ lat: number; lng: number; error?: string }> {
  try {
    const response = await axios({
      method: "post",
      url: GOOGLE_PLACES_API_URL,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.location",
      },
      data: {
        textQuery: "Gent Cuts and Grooming",
        maxResultCount: 1,
        locationBias: {
          circle: {
            center: {
              latitude: lat,
              longitude: lng,
            },
            radius: 1000.0,
          },
        },
      },
    });

    return {
      lat: response.data.places[0].location.latitude,
      lng: response.data.places[0].location.longitude,
    };
  } catch (error) {
    console.error(error);
    return { lat: 0, lng: 0, error: error as string };
  }
}

async function getLocation(
  address: string
): Promise<{ lat: number; lng: number; error?: string }> {
  try {
    const response = await axios({
      method: "post",
      url: GOOGLE_PLACES_API_URL,
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.location",
      },
      data: {
        textQuery: address,
        maxResultCount: 1,
      },
    });

    return {
      lat: response.data.places[0].location.latitude,
      lng: response.data.places[0].location.longitude,
    };
  } catch (error) {
    console.error(error);
    return { lat: 0, lng: 0, error: error as string };
  }
}

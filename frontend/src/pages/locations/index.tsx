import useLocations from "@/hooks/useLocations";
import {
  type LocationHours,
  type Location,
  type Stylist,
  type StylistService,
  type Service,
} from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopSection from "./TopSection";
import LocationSection from "./LocationSection";
import StylistsSection from "./StylistsSection";

export default function LocationsPage() {
  const [activeStylistServices, setActiveStylistServices] = useState<
    StylistService[] | null
  >(null);
  const locations = useLocations();
  const locationHours = useLocationHours(locations);
  const path = useLocation().pathname.split("/").pop() || "";
  const currentLocation =
    locations?.find(
      (location) => location.path.toLowerCase() === path.toLowerCase()
    ) || null;
  const stylists = useLocationStylists(currentLocation);
  const navigate = useNavigate();
  const links = locations?.map((location) => ({
    to: `locations/${location.path}`,
    text: location.address.city,
  }));

  async function handleActiveStylistChange(stylist: Stylist) {
    const response = await axios.get(
      `http://localhost:3000/stylistServices?stylistId=${stylist.id}`
    );
    const stylistServices = response.data;
    const detailsResponse = await axios.get("http://localhost:3000/services");

    stylistServices.forEach((stylistService: StylistService) => {
      const details = detailsResponse.data.find(
        (service: Service) => service.id === stylistService.serviceId
      );
      stylistService.details = details;
    });
    setActiveStylistServices(stylistServices);
  }

  useEffect(() => {
    if (!locations || locations.length === 0) return;
    const isValidPath =
      path.length > 0 &&
      locations?.some(
        (location) => location.path.toLowerCase() === path.toLowerCase()
      );
    if (!isValidPath) {
      navigate(`/locations/${locations[0].path}`);
    }
  }, [locations, path, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-16 mx-auto">
      <TopSection links={links} />
      <LocationSection
        currentLocation={currentLocation}
        hours={locationHours || []}
      />
      <StylistsSection
        stylists={stylists || []}
        services={activeStylistServices || []}
        onActiveStylistChange={handleActiveStylistChange}
      />
    </div>
  );
}

function useLocationHours(
  locations: Location[] | null
): LocationHours[] | null {
  const [locationHours, setLocationHours] = useState<LocationHours[] | null>(
    null
  );
  const path = useLocation().pathname.split("/").pop() || "";
  useEffect(() => {
    if (!locations) return;
    const currentLocation = locations?.find(
      (location) => location.path.toLowerCase() === path.toLowerCase()
    );
    if (!currentLocation) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/locationHours?locationId=${currentLocation.id}`,
          { signal }
        );
        setLocationHours(response.data);
      } catch (error) {
        if (signal.aborted) return;
        console.error("Error fetching locations:", error);
      }
    };

    fetch();

    return () => controller.abort();
  }, [path, locations]);

  return locationHours;
}

function useLocationStylists(location: Location | null): Stylist[] | null {
  const [stylists, setStylists] = useState<Stylist[] | null>(null);
  useEffect(() => {
    if (!location) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetch = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/stylists?locationId=${location.id}`,
          { signal }
        );
        setStylists(response.data);
      } catch (error) {
        if (signal.aborted) return;
        console.error("Error fetching stylists:", error);
      }
    };

    fetch();

    return () => controller.abort();
  }, [location]);

  return stylists;
}

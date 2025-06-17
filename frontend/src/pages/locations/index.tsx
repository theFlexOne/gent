import useLocations from "@/hooks/useLocations";
import { type Stylist } from "@/types/apiTypes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopSection from "./TopSection";
import LocationSection from "./LocationSection";
import StylistsSection from "./StylistsSection";

export default function LocationsPage() {
  const [activeStylist, setActiveStylist] = useState<Stylist | null>(null);
  const locations = useLocations();
  const path = useLocation().pathname.split("/").pop() || "";
  const currentLocation =
    locations?.find(
      (location) => location.path.toLowerCase() === path.toLowerCase()
    ) || null;
  const links = locations?.map((location) => ({
    to: `locations/${location.path}`,
    text: location.address.city,
  }));
  const navigate = useNavigate();

  async function handleActiveStylistChange(stylist: Stylist) {
    setActiveStylist(stylist);
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
        hours={currentLocation?.hours || []}
      />
      <StylistsSection
        stylists={currentLocation?.stylists || []}
        services={activeStylist?.services || []}
        onActiveStylistChange={handleActiveStylistChange}
      />
    </div>
  );
}

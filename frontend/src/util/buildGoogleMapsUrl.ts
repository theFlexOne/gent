import type { LocationAddress } from "@/types";

const GOOGLE_MAPS_URL_BASE = "https://www.google.com/maps/search/?api=1";
const GENT_CUTS_AND_GROOMING = "Gent Cuts and Grooming";

export default function buildGoogleMapsUrl(address: LocationAddress) {
  const url = new URL(GOOGLE_MAPS_URL_BASE);
  const addressString = `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
  url.searchParams.set("query", `${GENT_CUTS_AND_GROOMING} ${addressString}`);

  return url.href;
}

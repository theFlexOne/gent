import FancyNav from "@/components/ui/FancyNav";
import type { Location } from "@/types";

export default function LocationsSection({
  locations,
}: {
  locations: Location[] | null;
}) {
  const links = locations?.map((location) => ({
    to: `locations/${location.path}`,
    text: location.address.city,
  }));

  return (
    <section className="flex flex-col relative mt-24">
      <FancyNav
        className="absolute -top-16 left-1/2 -translate-x-1/2 h-32 px-12"
        links={links}
      />
      <img src="/images/hero-2.png" alt="hero 2" className="w-screen" />
      <img
        src="/images/x-ribbon.png"
        alt="x ribbon"
        className="absolute bottom-0 w-full"
      />
    </section>
  );
}

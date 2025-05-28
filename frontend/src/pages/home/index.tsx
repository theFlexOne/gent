import TopSection from "./TopSection";
import ServicesSection from "./ServicesSection";
import LocationsSection from "./LocationsSection";
import MiscSection from "./MiscSection";
import TestimonialsSection from "./TestimonialsSection";
import LocationInfoSection from "./LocationInfoSection";
import useLocations from "@/hooks/useLocations";

export default function HomePage() {
  const locations = useLocations();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center gap-8">
        <TopSection />
        <ServicesSection />
        <LocationsSection locations={locations} />
        <MiscSection />
        <TestimonialsSection />
        <LocationInfoSection locations={locations} />
      </main>
    </div>
  );
}

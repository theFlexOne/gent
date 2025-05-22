import Header from "@/components/layout/header";
import TopSection from "./topSection";
import ServicesSection from "./servicesSection";
import LocationsSection from "./locationsSection";
import MiscSection from "./miscSection";
import TestimonialsSection from "./testimonialsSection";
import LocationInfoSection from "./locationInfoSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-8">
        <TopSection />
        <ServicesSection />
        <LocationsSection />
        <MiscSection />
        <TestimonialsSection />
        <LocationInfoSection />
        <div className="h-16 bg-cyan-500"></div>
      </main>
    </div>
  );
}

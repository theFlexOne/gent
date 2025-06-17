import TopSection from "./TopSection";
import ServicesSection from "./ServicesSection";
import LocationsSection from "./LocationsSection";
import MiscSection from "./MiscSection";
import TestimonialsSection from "./TestimonialsSection";
import LocationInfoSection from "./LocationInfoSection";
import useLocations from "@/hooks/useLocations";
import { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import type { Testimonial } from "@/types/apiTypes";

const TESTIMONIALS_URL = "http://localhost:8080/api/testimonials";

export default function HomePage() {
  const locations = useLocations();
  const [testimonials, activeTestimonialId, handleActiveTestimonialChange] =
    useTestimonials();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center gap-8">
        <TopSection />
        <ServicesSection />
        <LocationsSection locations={locations} />
        <MiscSection />
        <TestimonialsSection
          activeTestimonial={
            testimonials.find((t) => t.id === activeTestimonialId) || null
          }
          testimonials={testimonials}
          onActiveTestimonialChange={handleActiveTestimonialChange}
        />
        <LocationInfoSection locations={locations} />
      </main>
    </div>
  );
}

function useTestimonials(): [
  Testimonial[],
  number | null,
  React.Dispatch<React.SetStateAction<number | null>>
] {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonialId, setActiveTestimonialId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get(TESTIMONIALS_URL, { signal });
        setTestimonials(response.data);
      } catch (error) {
        if (signal.aborted) return;
        console.error("Error fetching testimonials:", error);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    if (!activeTestimonialId) {
      setActiveTestimonialId(testimonials[0].id);
    } else {
      const interval = setInterval(() => {
        setActiveTestimonialId((prev) => {
          const currentIndex = testimonials.findIndex((t) => t.id === prev);
          const nextIndex = (currentIndex + 1) % testimonials.length;
          return testimonials[nextIndex].id;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials, activeTestimonialId]);

  return [testimonials, activeTestimonialId, setActiveTestimonialId];
}

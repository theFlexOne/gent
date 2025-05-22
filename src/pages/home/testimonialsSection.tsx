import LineBreak from "@/components/misc/lineBreak";
import Quote from "@/components/misc/quote";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  quote: string;
};

const testimonialsUrl = "http://localhost:3000/testimonials";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get(testimonialsUrl, { signal });
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
    const interval = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials, activeTestimonialIndex]);

  return (
    <section className="flex flex-col gap-6 items-center mt-8">
      <h3 className="text-4xl text-primary font-[Lucida] tracking-widest uppercase">
        Testimonials
      </h3>
      <div className="flex flex-col items-center gap-8 w-5/8">
        <div className="w-12">
          <Quote />
        </div>
        {testimonials.length > 0 && (
          <>
            {
              <div className="flex flex-col items-center gap-6">
                <p className="text-2xl font-bold text-center font-[Roboto] tracking-wide leading-12">
                  {testimonials[activeTestimonialIndex].quote}
                </p>
                <span className="font-bold text-gray-500 font-[Roboto]">
                  {testimonials[activeTestimonialIndex].name}
                </span>
              </div>
            }
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full cursor-pointer",
                    activeTestimonialIndex === index
                      ? "bg-primary"
                      : "border border-primary"
                  )}
                  onClick={() => setActiveTestimonialIndex(index)}
                ></span>
              ))}
            </div>
          </>
        )}
        <LineBreak fancy />
      </div>
    </section>
  );
}

import LineBreak from "@/components/misc/LineBreak";
import Quote from "@/components/misc/Quote";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

const testimonialsUrl = "http://localhost:3000/testimonials";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTestimonialId, setActiveTestimonialId] = useState<number | null>(
    null
  );

  const activeTestimonial = testimonials.find(
    (t) => t.id === activeTestimonialId
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        const response = await axios.get(testimonialsUrl, { signal });
        console.log(response.data);

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

  return (
    <section className="flex flex-col gap-6 items-center mt-8">
      <h3 className="text-4xl text-primary font-[Lucida] uppercase">
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
                <p className="text-2xl font-bold text-center font-[Roboto] leading-12">
                  {activeTestimonial?.quote}
                </p>
                <span className="font-bold text-gray-500 font-[Roboto]">
                  {activeTestimonial?.name}
                </span>
              </div>
            }
            <div className="flex gap-2">
              {testimonials.map((testimonial) => (
                <span
                  key={testimonial.id}
                  className={cn(
                    "w-3 h-3 rounded-full cursor-pointer",
                    activeTestimonialId === testimonial.id
                      ? "bg-primary"
                      : "border border-primary"
                  )}
                  onClick={() => setActiveTestimonialId(testimonial.id)}
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

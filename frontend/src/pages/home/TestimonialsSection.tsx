import LineBreak from "@/components/misc/LineBreak";
import Quote from "@/components/misc/Quote";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/apiTypes";

export default function TestimonialsSection({
  activeTestimonial,
  testimonials,
  onActiveTestimonialChange,
}: {
  activeTestimonial: Testimonial | null;
  testimonials: Testimonial[];
  onActiveTestimonialChange: (id: number) => void;
}) {
  return (
    <section className="flex flex-col gap-6 items-center mt-8">
      <h3 className="text-4xl text-primary font-[Lucida] uppercase">
        Testimonials
      </h3>
      <div className="flex flex-col items-center gap-8 w-5/8">
        <div className="w-12">
          <Quote />
        </div>
        {activeTestimonial && (
          <>
            <div className="flex flex-col items-center gap-6">
              <p className="text-xl font-bold text-center font-[Roboto] leading-12">
                {activeTestimonial?.quote}
              </p>
              <span className="font-bold text-gray-500 font-[Roboto]">
                {activeTestimonial?.name}
              </span>
            </div>
            <div className="flex gap-2">
              {testimonials.map((testimonial) => (
                <span
                  key={testimonial.id}
                  className={cn(
                    "w-3 h-3 rounded-sm cursor-pointer",
                    activeTestimonial.id === testimonial.id
                      ? "bg-primary"
                      : "border border-primary"
                  )}
                  onClick={() => onActiveTestimonialChange(testimonial.id)}
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

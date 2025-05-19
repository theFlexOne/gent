import { Button } from "@/components/ui/button";

export default function TopSection() {
  return (
    <section className="relative">
      <img src="/hero-1.png" alt="hero" className="w-full" />
      <div className="w-full absolute bottom-30 left-1/2 -translate-x-1/2 flex justify-evenly">
        <a href="#">
          <Button>Schedule Appointment</Button>
        </a>
        <a href="#">
          <Button>Contact Us</Button>
        </a>
      </div>
    </section>
  );
}

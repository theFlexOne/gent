import Button from "@/components/ui/Button";
import { NavLink } from "react-router-dom";

export default function TopSection() {
  return (
    <section className="relative">
      <img src="/images/hero-1.png" alt="hero" className="w-screen" />
      <div className="w-full absolute bottom-30 left-1/2 -translate-x-1/2 flex justify-evenly">
        <NavLink to="#">
          <Button>Schedule Appointment</Button>
        </NavLink>
        <NavLink to="#">
          <Button>Contact Us</Button>
        </NavLink>
      </div>
    </section>
  );
}

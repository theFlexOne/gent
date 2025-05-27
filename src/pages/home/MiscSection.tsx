import LineBreak from "@/components/misc/LineBreak";
import Button from "@/components/ui/Button";
import { NavLink } from "react-router-dom";

export default function MiscSection() {
  return (
    <section className="grid grid-cols-2 grid-rows-[auto_auto_auto] gap-17 w-5/8 mx-auto">
      <div className="col-span-1 grid grid-rows-subgrid row-span-3 gap-8 items-center">
        <div>
          <h3 className="text-5xl text-primary font-[Lucida] tracking-widest text-center uppercase mb-4">
            Gift Cards
          </h3>
          <LineBreak fancy />
        </div>
        <p className="text-center text-lg px-12">
          Giving the gift of GENT has never been easier. A GENT gift card is
          suitable for any occasion, and can be used for all GENT products or
          services. Gift cards come in a variety of denominations and arrive
          ready to give in our signature black envelopes. We also have E-Gift
          cards available for purchase. Click on our gift card link!
        </p>
        <div className="relative mb-5">
          <img
            src="/images/gift-cards.png"
            alt="gift cards"
            className="w-full"
          />
          <NavLink to="#">
            <Button
              size="sm"
              className="absolute -bottom-5 left-1/2 -translate-x-1/2"
            >
              Buy Now
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="col-span-1 grid grid-rows-subgrid row-span-3 gap-8 items-center">
        <div>
          <h3 className="text-5xl text-primary font-[Lucida] tracking-widest text-center uppercase mb-4">
            Grooms Parties
          </h3>
          <LineBreak fancy />
        </div>
        <p className="text-center text-lg px-12">
          Ditch the cramped quarters of the church office or hotel room, and get
          ready at GENT! Our customizable Groom’s Parties offer a dedicated
          staff, our classic services and the relaxed environment of our
          Minneapolis location. Grab your groomsmen and make it a grooming
          experience to remember!
        </p>
        <div className="relative mb-5">
          <img
            src="/images/groom-pic.png"
            alt="gift cards"
            className="w-full"
          />
          <NavLink to="#">
            <Button
              size="sm"
              className="absolute -bottom-5 left-1/2 -translate-x-1/2"
            >
              More Info
            </Button>
          </NavLink>
        </div>
      </div>
    </section>
  );
}

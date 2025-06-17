import LineBreak from "@/components/misc/LineBreak";
import type { Stylist, Service } from "@/types/apiTypes";
import { useState } from "react";

export default function StylistsSection({
  stylists,
  services,
  onActiveStylistChange,
}: {
  stylists: Stylist[];
  services: Service[];
  onActiveStylistChange: (stylist: Stylist) => void;
}) {
  const [activeStylist, setActiveStylist] = useState<Stylist | null>(null);

  function handleClick(stylist: Stylist): void {
    if (activeStylist === stylist) {
      setActiveStylist(null);
    } else {
      setActiveStylist(stylist);
      onActiveStylistChange(stylist);
    }
  }

  return (
    <div className="flex flex-col gap-6 items-stretch text-center w-5/8">
      <h2 className="text-4xl text-primary uppercase tracking-wide font-bold">
        Staff
      </h2>
      <LineBreak fancy />
      <p>
        Whatever location you choose, our expert staff will provide
        uncompromising quality and exceptional service. GENT is dedicated to
        men's grooming, and our staff receives regular continuing education to
        ensure you have the best experience possible.
      </p>
      {activeStylist && (
        <div className="flex flex-col gap-6">
          <LineBreak />
          <div className="flex-1 flex gap-8">
            <img
              src={generateImageSrc(activeStylist)}
              alt={`${activeStylist.name} bio`}
            />
            <div className="flex-1 flex flex-col gap-2 justify-end items-start text-start">
              <h3 className="text-2xl font-bold text-primary uppercase">
                {`${activeStylist.name} - ${activeStylist.title}`}
              </h3>
              <div className="text-sm">
                {services
                  .map((service) => `${service.name} $${service.price}`)
                  .join(" | ")}
              </div>
              <p className="text-sm">{activeStylist.bio}</p>
            </div>
          </div>
          <LineBreak />
        </div>
      )}
      <p>CLICK ON STAFF PHOTOS BELOW TO SEE BIO AND PRICING</p>
      <div className="grid grid-cols-4 gap-4 bg-cyan-500/15">
        {stylists.map((stylist) => (
          <div key={stylist.id}>
            <img
              src={generateImageSrc(stylist)}
              alt={`${stylist.name}`}
              onClick={() => handleClick(stylist)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function generateImageSrc(stylist: Stylist): string {
  return `/images/stylists/${stylist.profileImage}`;
}

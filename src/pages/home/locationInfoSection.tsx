import MapSquare from "@/components/misc/mapSquare";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

type LocationInfo = {
  city: string;
  phone: string | number;
  address: string;
  note: string;
};

export default function LocationInfoSection() {
  const [locations, setLocations] = useState<LocationInfo[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/locations", {
          signal,
        });
        setLocations(response.data);
      } catch (error) {
        if (signal.aborted) return;
        console.error("Error fetching locations:", error);
      }
    })();

    return () => controller.abort();
  }, []);

  return (
    <section className="w-5/8">
      <div className="grid grid-cols-2 gap-6">
        <form action="" className="col-span-1 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Name"
            className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
          />
          <Input
            type="email"
            placeholder="Email"
            className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
          />
          <Textarea
            rows={4}
            placeholder="Message"
            className="bg-gray-300 placeholder:font-semibold placeholder:text-sm"
          />
          <Button className="self-end" size="sm">
            Submit
          </Button>
        </form>
        <div className="flex flex-col gap-4 col-span-1 items-center">
          <MapSquare className="w-full" />
          <div className="flex flex-col gap-8 w-full">
            {locations.map((location) => (
              <div className="flex flex-col gap-2" key={location.address}>
                <h4 className="text-4xl uppercase">{location.city}</h4>
                <a
                  className="hover:underline cursor-pointer text-2xl"
                  href={`tel:${location.phone}`}
                >
                  {location.phone}
                </a>
                {location.note && <p>{location.note}</p>}
                <p>{location.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

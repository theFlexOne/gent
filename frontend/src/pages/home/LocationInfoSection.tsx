import MapSquare from "@/components/misc/MapSquare";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import type { Location } from "@/types";
import { fullLocationAddress } from "@/lib/utils";

export default function LocationInfoSection({
  locations,
}: {
  locations: Location[] | null;
}) {
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
            {locations &&
              locations.map((location) => (
                <div className="flex flex-col gap-2" key={location.id}>
                  <h4 className="text-4xl uppercase">
                    {location.address.city}
                  </h4>
                  <a
                    className="hover:underline cursor-pointer text-2xl"
                    href={`tel:${location.phone}`}
                  >
                    {location.phone}
                  </a>
                  {location.note && <p>{location.note}</p>}
                  <p>{fullLocationAddress(location.address)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

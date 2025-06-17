import MapSquare from "@/components/misc/MapSquare";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import type { Location } from "@/types/apiTypes";
import { fullLocationAddress } from "@/lib/utils";

export default function LocationInfoSection({
  locations,
}: {
  locations: Location[] | null;
}) {
  return (
    <section className="w-5/8 flex flex-col gap-12">
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
        <MapSquare className="w-full col-span-1" />
      </div>
      <div className="grid grid-cols-2 gap-6 ">
        {locations &&
          locations.map((location) => (
            <div
              className="col-span-1 flex flex-col gap-2 place-self-end"
              key={location.id}
            >
              <h4 className="text-4xl uppercase">{location.address.city}</h4>
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
    </section>
  );
}

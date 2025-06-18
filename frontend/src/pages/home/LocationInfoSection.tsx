import MapSquare from "@/components/misc/MapSquare";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import type { Location } from "@/types/apiTypes";
import { fullLocationAddress } from "@/lib/utils";
import { Link } from "react-router-dom";
import buildGoogleMapsUrl from "@/util/buildGoogleMapsUrl";

export default function LocationInfoSection({
  locations,
}: {
  locations: Location[] | null;
}) {
  return (
    <section className="w-5/8 flex flex-col gap-12">
      <div className="grid grid-cols-2 gap-6 px-20 w-full self-center">
        <form action="" className="col-span-1 flex flex-col gap-4">
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
          <Input type="tel" placeholder="Phone Number" />
          <Textarea rows={4} placeholder="Message" />
          <Button className="self-end" size="sm">
            Submit
          </Button>
        </form>
        <MapSquare className="w-full col-span-1" />
      </div>
      <div className="grid grid-cols-3 gap-10 ">
        {locations &&
          locations.map((location) => (
            <div className="col-span-1 flex flex-col gap-2" key={location.id}>
              <h4 className="text-3xl uppercase">{location.address.city}</h4>
              <Link
                className="hover:underline cursor-pointer text-2xl"
                to={`tel:${location.phone}`}
              >
                {location.phone}
              </Link>
              <Link
                to={buildGoogleMapsUrl(location.address)}
                className="hover:underline cursor-pointer text-xl"
                target="_blank"
              >
                {fullLocationAddress(location.address)}
              </Link>
              {location.note && (
                <p className="text-sm italic">{location.note}</p>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}

import LineBreak from "@/components/misc/LineBreak";
import MapSquare from "@/components/misc/MapSquare";
import Button from "@/components/ui/Button";
import { fullLocationAddress } from "@/lib/utils";
import type { LocationHours, Location } from "@/types/apiTypes";
import { Link } from "react-router-dom";

export default function LocationSection({
  currentLocation,
  hours,
}: {
  currentLocation: Location | null;
  hours: LocationHours[];
}) {
  function renderHours(): React.ReactNode[] {
    const hourElements = [];
    for (let i = 0; i < 7; i++) {
      hourElements.push(<span key={i}>{printHoursForDay(hours, i)}</span>);
    }
    return hourElements;
  }

  console.log("currentLocation", currentLocation);

  return (
    currentLocation && (
      <div className="flex flex-col items-stretch w-5/8">
        <h1 className="text-6xl text-primary font-semibold font-[Lucida] uppercase text-center leading-normal">
          Gent Cuts & Grooming
          <br />
          {`in ${currentLocation?.address.city}`}
        </h1>
        <LineBreak fancy />
        <div className="grid grid-cols-[1fr_2fr] gap-12 mt-12 font-[Helvetica]">
          <div className="col-span-1 flex flex-col gap-8 whitespace-nowrap">
            <Link
              to={`tel:${currentLocation?.phone}`}
              className="text-2xl underline"
            >
              {currentLocation?.phone}
            </Link>
            <p className="">{fullLocationAddress(currentLocation?.address)}</p>
            <div className="grid grid-cols-2">
              <div className="mr-8 flex flex-col gap-1">
                <span>SUNDAY</span>
                <span>MONDAY</span>
                <span>TUESDAY</span>
                <span>WEDNESDAY</span>
                <span>THURSDAY</span>
                <span>FRIDAY</span>
                <span>SATURDAY</span>
              </div>
              <div className="flex flex-col gap-1 text-end">
                {renderHours()}
              </div>
            </div>
            <Link to="/#">
              <Button>Schedule Online</Button>
            </Link>
          </div>
          <div className="col-span-1 w-full h-full bg-pink-500/15">
            <MapSquare
              className="w-full aspect-square"
              address={fullLocationAddress(currentLocation?.address)}
            />
          </div>
        </div>
      </div>
    )
  );
}

function printHoursForDay(hours: LocationHours[] | null, day: number): string {
  if (hours === null) return "";
  return `${hours.find((hour) => hour.day === day)?.open} - ${
    hours.find((hour) => hour.day === day)?.close
  }`;
}

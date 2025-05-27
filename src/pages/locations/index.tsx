import LineBreak from "@/components/misc/LineBreak";
import MapSquare from "@/components/misc/MapSquare";
import useLocations from "@/hooks/useLocations";
import { cn, fullLocationAddress } from "@/lib/utils";
import type { LocationHours } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useLoaderData, useNavigate } from "react-router-dom";

export default function LocationsPage() {
  const locations = useLocations();
  const path: string = useLoaderData();
  const navigate = useNavigate();
  const [locationHours, setLocationHours] = useState<LocationHours[] | null>(
    null
  );

  const currentLocation = locations?.find(
    (location) => location.path.toLowerCase() === path.toLowerCase()
  );

  useEffect(() => {
    if (!locations) return;
    const isValidPath =
      path.length > 0 &&
      locations?.some(
        (location) => location.path.toLowerCase() === path.toLowerCase()
      );
    if (!isValidPath) {
      navigate(`/locations/${locations[0].path}`);
    }
  }, [locations, path, navigate]);

  useEffect(() => {
    const currentLocation = locations?.find(
      (location) => location.path.toLowerCase() === path.toLowerCase()
    );
    if (!currentLocation) return;
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/locationHours?locationId=${currentLocation.id}`
        );
        setLocationHours(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    })();
  }, [path, locations]);

  return (
    <div className="min-h-screen flex flex-col items-center gap-16">
      <div className="h-[481px] mb-24 relative">
        <img
          src="/images/hero-3.png"
          alt="hero"
          className="w-screen h-full object-cover object-center"
        />
        <nav className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-neutral-800 text-white whitespace-nowrap font-[Lucida] font-bold uppercase text-lg tracking-widest flex gap-12 justify-center items-center px-12 h-32">
          {locations &&
            locations.map((location, index) => (
              <LocationLink
                key={location.id}
                to={`/locations/${location.path}`}
                last={index === locations.length - 1}
              >
                {location.address.city}
              </LocationLink>
            ))}
        </nav>
      </div>
      {currentLocation && (
        <div className="flex flex-col items-stretch w-1/2">
          <h1 className="text-6xl text-primary font-semibold font-[Lucida] uppercase text-center tracking-widest leading-normal">
            Gent Cuts & Grooming
            <br />
            {`in ${currentLocation?.address.city}`}
          </h1>
          <LineBreak fancy />
          <div className="grid grid-cols-[1fr_2fr] gap-12 bg-gray-500/15 mt-12 font-[Helvetica]">
            <div className="col-span-1 flex flex-col gap-4 bg-lime-500/15">
              <Link
                to={`tel:${currentLocation?.phone}`}
                className="text-2xl underline"
              >
                {currentLocation?.phone}
              </Link>
              <p className="">
                {fullLocationAddress(currentLocation?.address)}
              </p>
              <div className="grid grid-cols-2">
                <div className="mr-8">
                  <p>SUNDAY</p>
                  <p>MONDAY</p>
                  <p>TUESDAY</p>
                  <p>WEDNESDAY</p>
                  <p>THURSDAY</p>
                  <p>FRIDAY</p>
                  <p>SATURDAY</p>
                </div>
                <div className="flex flex-col text-end">
                  <p>{`${
                    locationHours?.find((hour) => hour.day === 0)?.open
                  } - ${
                    locationHours?.find((hour) => hour.day === 0)?.close
                  }`}</p>
                  <p>{`${
                    locationHours?.find((hour) => hour.day === 1)?.open
                  } - ${
                    locationHours?.find((hour) => hour.day === 1)?.close
                  }`}</p>
                  <p>{`${
                    locationHours?.find((hour) => hour.day === 2)?.open
                  } - ${
                    locationHours?.find((hour) => hour.day === 2)?.close
                  }`}</p>
                  <p>{`${
                    locationHours?.find((hour) => hour.day === 3)?.open
                  } - ${
                    locationHours?.find((hour) => hour.day === 3)?.close
                  }`}</p>
                  <p>{`${
                    locationHours?.find((hour) => hour.day === 4)?.open
                  } - ${
                    locationHours?.find((hour) => hour.day === 4)?.close
                  }`}</p>
                  <p>{`${
                    locationHours?.find((hour) => hour.day === 5)?.open
                  } - ${
                    locationHours?.find((hour) => hour.day === 5)?.close
                  }`}</p>
                  <p>{`${
                    locationHours?.find((hour) => hour.day === 6)?.open
                  } - ${
                    locationHours?.find((hour) => hour.day === 6)?.close
                  }`}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 w-full h-full bg-pink-500/15">
              <MapSquare
                className="w-full aspect-square"
                address={fullLocationAddress(currentLocation?.address)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationLink({
  children,
  to,
  last = false,
}: {
  children: React.ReactNode;
  to: string;
  last?: boolean;
}) {
  const className = cn(
    "hover:underline cursor-pointer",
    !last &&
      " relative after:content-[''] after:w-[1px] after:h-12 after:bg-white after:absolute after:-right-6 after:top-1/2 after:-translate-y-1/2"
  );
  return (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  );
}

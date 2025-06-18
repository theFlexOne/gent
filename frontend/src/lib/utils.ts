import type { LocationAddress } from "@/types/apiTypes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fullLocationAddress({
  street,
  city,
  state,
  zip,
}: LocationAddress) {
  return toTitleCase(`${street}, ${city}, ${state} ${zip}`);
}

export function toTitleCase(s: string) {
  return s
    .split("-")
    .map((value) => {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    })
    .join(" ");
}

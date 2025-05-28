import type { LocationAddress } from "@/types";
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
  return `${street}, ${city}, ${state} ${zip}`;
}

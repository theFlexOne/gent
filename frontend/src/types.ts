export interface Testimonial {
  id: number;
  name: string;
  quote: string;
}

export interface Location {
  id: number;
  path: string;
  phone: string;
  address: LocationAddress;
  hours: LocationHours[];
  stylists: Stylist[];
  note: string;
}

export interface LocationAddress {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  locationId: number;
}

export interface Stylist {
  id: number;
  name: string;
  title: string;
  profileImage: string;
  bio: string;
  services: Service[];
  locationId: number;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface LocationHours {
  id: number;
  day: number; // 0-6 representing days of the week (Sunday-Saturday)
  open: string; // Time format "HH:MM"
  close: string; // Time format "HH:MM"
  locationId: number;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
}

export type Testimonial = {
  id: number;
  name: string;
  quote: string;
};

export type Location = {
  id: number;
  path: string;
  phone: string;
  address: LocationAddress;
  hours: LocationHours[];
  stylists: Stylist[];
  note: string;
};

export type LocationAddress = {
  id: number;
  street: string;
  city: string;
  state: string;
  zip: string;
  locationId: number;
};

export type Stylist = {
  id: number;
  name: string;
  title: string;
  profileImage: string;
  bio: string;
  services: Service[];
  locationId: number;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type LocationHours = {
  id: number;
  day: number; // 0-6 representing days of the week (Sunday-Saturday)
  open: string; // Time format "HH:MM"
  close: string; // Time format "HH:MM"
  locationId: number;
};

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: Date;
};

export type ApiError = {
  timestamp: string;
  status: number;
  code: number;
  message: string;
  path: string;
  validationErrors: ValidationError[];
};

export type ValidationError = {
  field: string;
  message: string;
};

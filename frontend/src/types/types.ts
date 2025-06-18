import type { User } from "./apiTypes";

export type LoginFormErrors = {
  email?: string;
  password?: string;
};

export type LoginResponseData = {
  token: string;
  refreshToken: string;
  user: User | null;
  errors: ApiError | null;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterFormErrors = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
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

export type ModalId = "login" | "register";

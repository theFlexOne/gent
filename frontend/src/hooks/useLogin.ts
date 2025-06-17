import useUserDataContext from "@/context/user/useUserDataContext";
import type {
  LoginFormData,
  LoginResponseData,
  LoginFormErrors,
  ApiError,
  ValidationError,
} from "@/types";
import axios from "axios";
import { useState, useCallback } from "react";

const LOGIN_URL = "http://localhost:8080/api/auth/login";

export default function useLogin(): {
  login: (data: LoginFormData) => Promise<LoginResponseData | null>;
  error: LoginFormErrors;
} {
  const [error, setError] = useState<LoginFormErrors>({});
  const { updateUser } = useUserDataContext();

  const login = useCallback(
    async (data: LoginFormData): Promise<LoginResponseData | null> => {
      if (data.email.match(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        setError({ email: "Invalid email" });
        return null;
      }

      try {
        const response = await axios.post(LOGIN_URL, data);
        if (response.data) {
          updateUser(response.data.user);
          return response.data as LoginResponseData;
        }
      } catch (error) {
        const errors: LoginFormErrors = {};
        (error as ApiError).validationErrors.forEach((e: ValidationError) => {
          errors[e.field as keyof LoginFormErrors] = e.message;
        });
      }

      return null;
    },
    [updateUser]
  );

  return { login, error };
}

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
  loading: boolean;
  errors: LoginFormErrors;
} {
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  const { updateUser } = useUserDataContext();

  const login = useCallback(
    async (data: LoginFormData): Promise<LoginResponseData | null> => {
      setErrors({});
      setLoading(true);
      try {
        const response = await axios.post<LoginResponseData>(LOGIN_URL, data);
        if (response.data) {
          updateUser(response.data);
          return response.data;
        }
      } catch (error) {
        const errors: LoginFormErrors = {};
        (error as ApiError).validationErrors.forEach((e: ValidationError) => {
          errors[e.field as keyof LoginFormErrors] = e.message;
        });
        setErrors(errors);
      } finally {
        setLoading(false);
      }

      return null;
    },
    [updateUser]
  );

  return { login, loading, errors };
}

import useUserDataContext from "@/context/user/useUserDataContext";
import type {
  RegisterFormErrors,
  RegisterFormData,
  User,
  ApiError,
  ValidationError,
} from "@/types";
import axios from "axios";
import { useState, useCallback } from "react";

type UseRegisterReturn = {
  register: (data: RegisterFormData) => Promise<User | null>;
  loading: boolean;
  error: RegisterFormErrors;
};

const REGISTER_URL = "http://localhost:8080/api/auth/register";

export default function useRegister(): UseRegisterReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<RegisterFormErrors>({});

  const { updateUser } = useUserDataContext();

  function validateRegisterFormData(formData: RegisterFormData): boolean {
    if (formData.password !== formData.confirmPassword) {
      setError({
        confirmPassword: "Passwords do not match",
      });
      return false;
    }
    return true;
  }

  const register = useCallback(
    async (formData: RegisterFormData): Promise<User | null> => {
      setError({});
      setLoading(true);

      if (!validateRegisterFormData(formData)) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _, ...newUser } = formData;

      try {
        const response = await axios.post(REGISTER_URL, newUser);
        if (response.data) {
          updateUser(response.data);
          return response.data;
        }
      } catch (error) {
        const errors: RegisterFormErrors = {};
        (error as ApiError).validationErrors.forEach((e: ValidationError) => {
          errors[e.field as keyof RegisterFormErrors] = e.message;
        });
      } finally {
        setLoading(false);
      }
      return null;
    },
    [updateUser]
  );

  return { register, loading, error };
}

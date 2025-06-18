import useUserDataContext from "@/context/user/useUserDataContext";
import type {
  RegisterFormErrors,
  RegisterFormData,
  User,
  ValidationError,
  RegisterResponseData,
} from "@/types";
import axios from "axios";
import { useState, useCallback } from "react";

type UseRegisterReturn = {
  register: (data: RegisterFormData) => Promise<User | null>;
  loading: boolean;
  errors: RegisterFormErrors;
};

const REGISTER_URL = "http://localhost:8080/api/auth/register";

export default function useRegister(): UseRegisterReturn {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  const { updateUser } = useUserDataContext();

  function validateRegisterFormData(formData: RegisterFormData): boolean {
    if (formData.password !== formData.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });
      return false;
    }
    return true;
  }

  const register = useCallback(
    async (formData: RegisterFormData): Promise<User | null> => {
      setErrors({});
      setLoading(true);

      if (!validateRegisterFormData(formData)) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _, ...newUser } = formData;

      try {
        const response = await axios.post<RegisterResponseData>(
          REGISTER_URL,
          newUser
        );

        if (response.data.errors) {
          const errors: RegisterFormErrors = {};
          response.data.errors.validationErrors.forEach(
            (e: ValidationError) => {
              errors[e.field as keyof RegisterFormErrors] = e.message;
            }
          );
          setErrors(errors);
          return null;
        }

        if (response.data) {
          storeTokens(response.data.token, response.data.refreshToken);
          updateUser(response.data.user);
          return response.data.user;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
      return null;
    },
    [updateUser]
  );

  return { register, loading, errors };
}
function storeTokens(token: string, refreshToken: string) {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
}

import Button from "../ui/Button";
import { Input } from "../ui/Input";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent,
} from "react";
import type { User } from "@/types";
import axios from "axios";
import useUserDataContext from "@/context/user/useUserDataContext";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterFormError = {
  code: number;
  field: keyof RegisterFormData;
  message: string;
};

const REGISTER_URL = "http://localhost:8080/api/auth/register";

const INITIAL_FORM_DATA: RegisterFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterModal({
  closeModal,
  openLoginModal,
}: {
  closeModal: () => void;
  openLoginModal: () => void;
}) {
  const formDataRef = useRef<RegisterFormData>(INITIAL_FORM_DATA);

  const { register, error } = useRegister();
  const { user } = useUserDataContext();

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user, closeModal]);

  function handleOpenLoginModal(e: MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    openLoginModal();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (error) {
      return;
    }
    console.log(formDataRef.current);
    await register(formDataRef.current);
    closeModal();
  }

  function handleRegisterFormUpdate(field: keyof RegisterFormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      formDataRef.current[field] = e.target.value;
    };
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-primary">Register</h2>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          required
          type="text"
          placeholder="First Name"
          className="w-full"
          onChange={handleRegisterFormUpdate("firstName")}
        />
        <Input
          required
          type="text"
          placeholder="Last Name"
          className="w-full"
          onChange={handleRegisterFormUpdate("lastName")}
        />
        <div className="flex gap-4 w-full justify-center">
          <Input
            required
            type="tel"
            placeholder="Phone Number"
            onChange={handleRegisterFormUpdate("phone")}
          />
          <Input
            required
            type="date"
            placeholder="Date of Birth"
            onChange={handleRegisterFormUpdate("dateOfBirth")}
          />
        </div>
        <Input
          required
          type="email"
          placeholder="Email"
          className="w-full"
          onChange={handleRegisterFormUpdate("email")}
        />
        <div className="flex gap-4 w-full">
          <Input
            required
            type="password"
            placeholder="Password"
            className="flex-1"
            onChange={handleRegisterFormUpdate("password")}
          />
          <Input
            required
            type="password"
            placeholder="Confirm Password"
            className="flex-1"
            onChange={handleRegisterFormUpdate("confirmPassword")}
          />
        </div>
        <Button type="submit" size="sm" className="w-full mt-4">
          Sign Up
        </Button>
      </form>
      <div className="text-center flex flex-col gap-2">
        <p>Already have an account?</p>
        <p>
          Click{" "}
          <a
            href=""
            className="text-primary cursor-pointer hover:underline underline-offset-1"
            onClick={handleOpenLoginModal}
          >
            here
          </a>{" "}
          to login
        </p>
      </div>
    </>
  );
}

function useRegister() {
  const [error, setError] = useState<RegisterFormError | null>(null);

  const { updateUser } = useUserDataContext();

  function validateRegisterFormData(formData: RegisterFormData): boolean {
    if (formData.password !== formData.confirmPassword) {
      setError({
        code: 1000,
        field: "confirmPassword",
        message: "Passwords do not match",
      });
      return false;
    }
    return true;
  }

  const register = useCallback(
    async (formData: RegisterFormData): Promise<User | null> => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...newUser } = formData;
      if (!validateRegisterFormData(formData)) {
        return null;
      }
      try {
        const response = await axios.post(REGISTER_URL, newUser);
        if (response.data) {
          updateUser(response.data);
          return response.data as User;
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    },
    [updateUser]
  );

  return { register, error };
}

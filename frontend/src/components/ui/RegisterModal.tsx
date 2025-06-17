import Button from "./Button";
import { Input } from "./Input";
import { useEffect, useRef, type FormEvent, type MouseEvent } from "react";
import useUserDataContext from "@/context/user/useUserDataContext";
import type { RegisterFormData } from "@/types";
import useRegister from "@/hooks/useRegister";

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
          autoComplete="given-name"
          className="w-full"
          onChange={handleRegisterFormUpdate("firstName")}
        />
        <Input
          required
          type="text"
          placeholder="Last Name"
          autoComplete="family-name"
          className="w-full"
          onChange={handleRegisterFormUpdate("lastName")}
        />
        <div className="flex gap-4 w-full justify-center">
          <Input
            required
            type="tel"
            placeholder="Phone Number"
            autoComplete="tel"
            onChange={handleRegisterFormUpdate("phone")}
          />
          <Input
            required
            type="date"
            placeholder="Date of Birth"
            autoComplete="bday"
            onChange={handleRegisterFormUpdate("dateOfBirth")}
          />
        </div>
        <Input
          required
          type="email"
          placeholder="Email"
          autoComplete="email"
          className="w-full"
          onChange={handleRegisterFormUpdate("email")}
        />
        <div className="flex gap-4 w-full">
          <Input
            required
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className="flex-1"
            onChange={handleRegisterFormUpdate("password")}
          />
          <Input
            required
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
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

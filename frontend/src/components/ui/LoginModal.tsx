import useUserDataContext from "@/context/user/useUserDataContext";
import Button from "./Button";
import { Input } from "./Input";
import { useEffect, useRef, type FormEvent, type MouseEvent } from "react";
import type { LoginFormData } from "@/types/types";
import useLogin from "@/hooks/useLogin";

const INITIAL_FORM_DATA: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginModal({
  closeModal,
  openRegisterModal,
}: {
  closeModal: () => void;
  openRegisterModal: () => void;
}) {
  const loginFormDataRef = useRef<LoginFormData>(INITIAL_FORM_DATA);
  const { login, error } = useLogin();
  const { user } = useUserDataContext();

  function handleLoginFormUpdate(field: keyof LoginFormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      loginFormDataRef.current[field] = e.target.value;
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (error) {
      return;
    }
    console.log("login form data", loginFormDataRef.current);
    const response = await login(loginFormDataRef.current);
    console.log("response", response);
    closeModal();
  }

  function handleToggleRegister(e: MouseEvent<HTMLAnchorElement>): void {
    e.preventDefault();
    openRegisterModal();
  }

  useEffect(() => {
    if (user) {
      closeModal();
    }
  }, [user, closeModal]);

  return (
    <>
      <h2 className="text-3xl font-bold text-primary">Login</h2>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          onChange={handleLoginFormUpdate("email")}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={handleLoginFormUpdate("password")}
        />
        <Button type="submit" size="sm" className="w-full mt-4">
          Login
        </Button>
      </form>
      <div className="text-center flex flex-col gap-2">
        <p>Don't have an account?</p>
        <p>
          Click{" "}
          <a
            href=""
            onClick={handleToggleRegister}
            className="text-primary cursor-pointer hover:underline underline-offset-1"
          >
            here
          </a>{" "}
          to register
        </p>
      </div>
    </>
  );
}

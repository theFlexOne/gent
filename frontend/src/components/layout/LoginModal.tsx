import useUserDataContext from "@/context/user/useUserDataContext";
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

type LoginFormError = {
  code: number;
  field: "email" | "password";
  message: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  user: User | null;
  error: LoginFormData | null;
};

const LOGIN_URL = "http://localhost:8080/api/auth/login";

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
    // await login(loginFormDataRef.current);
    // closeModal();
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

function useLogin(): {
  login: (data: LoginFormData) => Promise<LoginResponse | null>;
  error: LoginFormError | null;
} {
  const [error, setError] = useState<LoginFormError | null>(null);
  const { updateUser } = useUserDataContext();

  const login = useCallback(
    async (data: LoginFormData): Promise<LoginResponse | null> => {
      try {
        const response = await axios.post(LOGIN_URL, data);
        if (response.data) {
          updateUser(response.data.user);
          return response.data as LoginResponse;
        }
      } catch (error) {
        console.error(error);
      }

      return null;
    },
    [updateUser]
  );

  return { login, error };
}

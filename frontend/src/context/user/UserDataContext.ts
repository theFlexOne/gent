import type { LoginResponseData } from "@/types";
import type { RegisterResponseData, User } from "@/types/apiTypes";
import { createContext } from "react";

export type UserDataContextType = {
  user: User | null;
  updateUser: (
    data: RegisterResponseData | LoginResponseData,
    save?: boolean
  ) => void;
  logout: () => void;
};

const UserDataContext = createContext<UserDataContextType>({
  user: null,
  updateUser: () => {},
  logout: () => {},
});

export default UserDataContext;

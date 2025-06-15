import type { User } from "@/types";
import { createContext } from "react";

export type UserDataContextType = {
  user: User | null;
  updateUser: (user: User | null, save?: boolean) => void;
  logout: () => void;
};

const UserDataContext = createContext<UserDataContextType>({
  user: null,
  updateUser: () => {},
  logout: () => {},
});

export default UserDataContext;

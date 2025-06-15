import { useContext } from "react";
import UserDataContext, { type UserDataContextType } from "./UserDataContext";

type UserHook = UserDataContextType;

export default function useUserDataContext(): UserHook {
  const ctx = useContext(UserDataContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return ctx;
}

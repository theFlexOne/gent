import type { RegisterResponseData, User } from "@/types/apiTypes";
import UserDataContext from "./UserDataContext";
import { useEffect, useState } from "react";
import type { LoginResponseData } from "@/types";

export default function UserDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  function updateUser(
    data: RegisterResponseData | LoginResponseData,
    save: boolean = false
  ) {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);

    if (data.user && save) {
      saveUser(data.user);
    }
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserDataContext.Provider>
  );
}

async function saveUser(user: User) {
  // TODO - persist user in database
}

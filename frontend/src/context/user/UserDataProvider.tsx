import type { User } from "@/types/apiTypes";
import UserDataContext from "./UserDataContext";
import { useEffect, useState } from "react";

export default function UserDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  function updateUser(user: User | null, save: boolean = false) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    if (user && save) {
      saveUser(user);
    }
  }

  function logout() {
    localStorage.removeItem("user");
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

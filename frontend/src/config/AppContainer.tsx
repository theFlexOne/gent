import GlobalModalProvider from "@/context/globalModal/GlobalModalProvider";
import UserDataProvider from "@/context/user/UserDataProvider";
import { setNavigate } from "@/util/navigationService";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AppContainer() {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
    return () => setNavigate(() => {});
  }, [navigate]);

  return (
    <UserDataProvider>
      <GlobalModalProvider>
        <Outlet />
      </GlobalModalProvider>
    </UserDataProvider>
  );
}

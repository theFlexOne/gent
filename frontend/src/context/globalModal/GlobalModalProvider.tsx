import { useState } from "react";
import GlobalModalContext from "./GlobalModalContext";
import { MODAL_ELEMENT_ID } from "@/components/ui/GlobalModal";
import LoginModal from "@/components/ui/LoginModal";
import RegisterModal from "@/components/ui/RegisterModal";
import GlobalModal from "@/components/ui/GlobalModal";
import type { ModalId } from "@/types";

const GlobalModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [openModalId, setOpenModalId] = useState<ModalId | null>(null);

  function getOpenModalContent() {
    switch (openModalId) {
      case null:
        return null;
      case "login":
        return (
          <LoginModal
            closeModal={() => setOpenModalId(null)}
            openRegisterModal={() => setOpenModalId("register")}
          />
        );
      case "register":
        return (
          <RegisterModal
            closeModal={() => setOpenModalId(null)}
            openLoginModal={() => setOpenModalId("login")}
          />
        );
      default:
        return null;
    }
  }

  return (
    <GlobalModalContext.Provider value={{ openModalId, setOpenModalId }}>
      <div id={MODAL_ELEMENT_ID} />
      <GlobalModal closeModal={() => setOpenModalId(null)}>
        {getOpenModalContent()}
      </GlobalModal>
      {children}
    </GlobalModalContext.Provider>
  );
};

export default GlobalModalProvider;

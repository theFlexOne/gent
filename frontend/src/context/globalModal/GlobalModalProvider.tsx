import { useState } from "react";
import GlobalModalContext, { type ModalId } from "./GlobalModalContext";
import { MODAL_ELEMENT_ID } from "@/components/layout/Modal";
import LoginModal from "@/components/layout/LoginModal";
import RegisterModal from "@/components/layout/RegisterModal";
import GlobalModal from "@/components/layout/GlobalModal";

const GlobalModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeModalId, setActiveModalId] = useState<ModalId | null>(null);

  function getOpenModalContent() {
    switch (activeModalId) {
      case null:
        return null;
      case "login":
        return (
          <LoginModal
            closeModal={() => setActiveModalId(null)}
            openRegisterModal={() => setActiveModalId("register")}
          />
        );
      case "register":
        return (
          <RegisterModal
            closeModal={() => setActiveModalId(null)}
            openLoginModal={() => setActiveModalId("login")}
          />
        );
      default:
        return null;
    }
  }

  return (
    <GlobalModalContext.Provider
      value={{ openModalId: activeModalId, setActiveModalId }}
    >
      <div id={MODAL_ELEMENT_ID} />
      <GlobalModal closeModal={() => setActiveModalId(null)}>
        {getOpenModalContent()}
      </GlobalModal>
      {children}
    </GlobalModalContext.Provider>
  );
};

export default GlobalModalProvider;

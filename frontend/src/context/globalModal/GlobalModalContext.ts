import { createContext, type ElementType } from "react";

export type ModalId = "login" | "register";

export type GlobalModalContextType = {
  openModalId: ModalId | null;
  setActiveModalId: (id: ModalId | null) => void;
};

export type GlobalModal = {
  id: "login" | "register";
  content: ElementType;
};

const GlobalModalContext = createContext<GlobalModalContextType>({
  openModalId: null,
  setActiveModalId: () => {},
});

export default GlobalModalContext;

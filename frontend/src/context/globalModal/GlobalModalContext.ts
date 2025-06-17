import type { ModalId } from "@/types";
import { createContext, type ElementType } from "react";

export type GlobalModalContextType = {
  openModalId: ModalId | null;
  setOpenModalId: (id: ModalId | null) => void;
};

export type GlobalModal = {
  id: "login" | "register";
  content: ElementType;
};

const GlobalModalContext = createContext<GlobalModalContextType>({
  openModalId: null,
  setOpenModalId: () => {},
});

export default GlobalModalContext;

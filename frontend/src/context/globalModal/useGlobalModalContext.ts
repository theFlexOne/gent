import { useContext } from "react";
import GlobalModalContext from "./GlobalModalContext";
import type { ModalId } from "@/types";

type GlobalModalHook = {
  openModal: (id?: ModalId) => void;
  closeModal: () => void;
  toggleModal: (id?: ModalId) => void;
  isModalOpen: boolean;
};

export default function useGlobalModalContext(
  modalId: ModalId
): GlobalModalHook {
  const ctx = useContext(GlobalModalContext);
  if (!ctx) {
    throw new Error(
      "useGlobalModalContext must be used within a GlobalModalProvider"
    );
  }

  function openModal(id?: ModalId) {
    return ctx.setOpenModalId(id || modalId);
  }

  function closeModal() {
    return ctx.setOpenModalId(null);
  }

  function toggleModal(id?: ModalId) {
    return ctx.setOpenModalId(ctx.openModalId === id ? null : id || modalId);
  }

  const isModalOpen = (() => {
    return ctx.openModalId !== null;
  })();

  return { openModal, closeModal, toggleModal, isModalOpen };
}

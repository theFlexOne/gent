import { useContext } from "react";
import GlobalModalContext, { type ModalId } from "./GlobalModalContext";

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
    return ctx.setActiveModalId(id || modalId);
  }

  function closeModal() {
    return ctx.setActiveModalId(null);
  }

  function toggleModal(id?: ModalId) {
    return ctx.setActiveModalId(ctx.openModalId === id ? null : id || modalId);
  }

  const isModalOpen = (() => {
    return ctx.openModalId !== null;
  })();

  return { openModal, closeModal, toggleModal, isModalOpen };
}

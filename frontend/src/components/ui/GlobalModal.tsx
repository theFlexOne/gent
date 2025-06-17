import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { cn } from "@/lib/utils";

type GlobalModalProps = {
  className?: string;
  children: React.ReactNode;
  closeModal: () => void;
};

export const MODAL_ELEMENT_ID = "globalModal";

export default function GlobalModal({
  className = "",
  children,
  closeModal,
}: GlobalModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const classes = cn(
    "p-6 bg-white rounded-md shadow-md grid place-items-center min-w-1/4 relative",
    className
  );

  useEffect(() => {
    if (modalRef.current) {
      return;
    }
    modalRef.current = document.getElementById(
      MODAL_ELEMENT_ID
    ) as HTMLDivElement;
  }, [modalRef]);

  return (
    modalRef.current &&
    children &&
    ReactDOM.createPortal(
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black/25 grid place-items-center z-50"
        onClick={closeModal}
        onScroll={
          () => {}
          /* TODO: Prevent scrolling while modal is open */
        }
      >
        <div className={classes} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
        <button
          className="material-symbols-outlined absolute top-4 right-4 cursor-pointer text-black/30 hover:text-primary"
          onClick={closeModal}
        >
          close
        </button>
      </div>,
      modalRef.current
    )
  );
}

import { cn } from "@/lib/utils";

export const MODAL_ELEMENT_ID = "globalModal";

export default function Modal({
  children,
  closeModal,
  className = "",
}: {
  children: React.ReactNode;
  closeModal: () => void;
  className?: string;
}) {
  const classes = cn(
    "p-6 bg-white rounded-md shadow-md grid place-items-center min-w-1/4 relative",
    className
  );

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen bg-black/25 grid place-items-center z-50"
      onClick={closeModal}
    >
      <div className={classes} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <CloseIcon closeModal={closeModal} />
    </div>
  );
}

function CloseIcon({ closeModal }: { closeModal: () => void }) {
  return (
    <button
      className="material-symbols-outlined absolute top-4 right-4 cursor-pointer text-black/30 hover:text-primary"
      onClick={closeModal}
    >
      close
    </button>
  );
}

"use client";
import { PropsWithChildren, createContext, useState } from "react";
export type modalStatusType = "open" | "close";
interface IModalContext {
  isOpen: boolean;
  setModal: (isOpen: modalStatusType) => void;
}
export const ModalContext = createContext<IModalContext>({
  isOpen: false,
  setModal: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const setModal = (isOpen: modalStatusType) => {
    setIsOpen(isOpen == "open");
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

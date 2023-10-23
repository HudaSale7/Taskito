import { createContext } from "react";

interface ModalContext {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

export const modalContext = createContext<ModalContext>({
  modal: false,
  setModal: () => {},
});

import { createContext } from "react";

interface ModalContext {
  modal: boolean;
  setModal: (modal: boolean) => void;
  taskStatusId: { taskId: string; statusId: string };
  setTaskStatusId: (args: { taskId: string; statusId: string }) => void;
}

export const modalContext = createContext<ModalContext>({
  modal: false,
  setModal: () => {},
  taskStatusId: { taskId: "-1", statusId: "-1" },
  setTaskStatusId: () => {},
});

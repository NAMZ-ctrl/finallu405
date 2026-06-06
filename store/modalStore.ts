import { create } from "zustand";

type ModalAction = {
  open: boolean;
  handleOpenClick: () => void;
  handleCloseClick: () => void;
};

export const useModal = create<ModalAction>((set) => ({
  open: false,
  handleOpenClick: () => set({ open: true }),
  handleCloseClick: () => set({ open: false }),
}));

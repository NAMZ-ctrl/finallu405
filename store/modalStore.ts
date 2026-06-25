import { create } from "zustand";

interface ModalStore {
  open: boolean;
  handleOpenClick: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  open: false,
  handleOpenClick: () => set((state) => ({ open: !state.open })),
}));
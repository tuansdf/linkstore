import create from "zustand";

interface AddTagModalState {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const useAddTagModalStore = create<AddTagModalState>((set) => ({
  isOpen: false,
  closeModal: () => set(() => ({ isOpen: false })),
  openModal: () => set(() => ({ isOpen: true })),
}));

export default useAddTagModalStore;

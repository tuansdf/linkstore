import create from "zustand";

interface AddLinkModalState {
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const useAddLinkModalStore = create<AddLinkModalState>((set) => ({
  isOpen: false,
  closeModal: () => set(() => ({ isOpen: false })),
  openModal: () => set(() => ({ isOpen: true })),
}));

export default useAddLinkModalStore;

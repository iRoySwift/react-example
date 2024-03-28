import { create } from 'zustand';

type iDrawerSore = {
  drawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const useDrawerStore = create<iDrawerSore>((set) => ({
  drawer: false,
  openDrawer: () => set({ drawer: true }),
  closeDrawer: () => set({ drawer: false })
}));

export default useDrawerStore;

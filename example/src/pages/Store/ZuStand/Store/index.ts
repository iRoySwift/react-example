import { create } from 'zustand';

const useDrawerStore = create((set) => ({
  drawer: false,
  openDrawer: () => set({ drawer: true }),
  closeDrawer: () => set({ drawer: false })
}));

export default useDrawerStore;

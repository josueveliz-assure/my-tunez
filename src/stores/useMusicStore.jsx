import { create } from "zustand";

export const useMusicStore = create((set) => ({
  musicId: null,
  setMusicId: (id) => set({ musicId: id }),
}));
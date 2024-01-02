import { create } from 'zustand';

export const useAlbumStore = create((set) => ({
  albums: [],
  setAlbums: (albumList) => set({ albums: albumList }),
}));
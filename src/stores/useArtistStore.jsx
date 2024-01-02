import { create } from 'zustand';

export const useArtistStore = create((set) => ({
  artistId: null,
  artists: [],
  setArtistId: (id) => set({ artistId: id }),
  setArtists: (artists) => set({ artists: artists }),
}));
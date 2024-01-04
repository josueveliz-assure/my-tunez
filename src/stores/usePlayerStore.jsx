import { create } from "zustand";

export const usePlayerStore = create((set) => ({
  isPlaying: false,
  playlist: [],
  currentPosition: 0,
  currentSong: null,
  volume: 0.5,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlaylist: (playlist) => set({ playlist }),
  setCurrentPosition: (currentPosition) => set({ currentPosition }),
  setCurrentSong: (currentSong) => set({ currentSong }),
  setVolume: (volume) => set({ volume })
}));
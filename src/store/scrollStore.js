import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  activeSection: 0,
  setActiveSection: (section) => set({ activeSection: section }),
}))

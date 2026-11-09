import { create } from 'zustand'

interface UIState {
  readonly isSidebarCollapsed: boolean
  readonly isMobileNavOpen: boolean
  readonly isSearchOpen: boolean
  readonly toggleSidebar: () => void
  readonly setSidebarCollapsed: (collapsed: boolean) => void
  readonly setMobileNavOpen: (open: boolean) => void
  readonly setSearchOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarCollapsed: false,
  isMobileNavOpen: false,
  isSearchOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapsed: (collapsed: boolean) => set({ isSidebarCollapsed: collapsed }),
  setMobileNavOpen: (open: boolean) => set({ isMobileNavOpen: open }),
  setSearchOpen: (open: boolean) => set({ isSearchOpen: open }),
}))

import { create } from 'zustand'

interface WalletState {
  address: string | null
  networkName: string | null
  isConnecting: boolean
  setAddress: (address: string | null) => void
  setNetworkName: (name: string | null) => void
  setConnecting: (connecting: boolean) => void
}

interface SessionState {
  isLoggedIn: boolean
  roles: string[]
  setLoggedIn: (loggedIn: boolean) => void
  setRoles: (roles: string[]) => void
}

interface UiState {
  locale: string
  setLocale: (locale: string) => void
}

export const useAppStore = create<WalletState & SessionState & UiState>((set) => ({
  address: null,
  networkName: null,
  isConnecting: false,
  isLoggedIn: false,
  roles: [],
  locale: 'en',
  setAddress: (address) => set({ address }),
  setNetworkName: (networkName) => set({ networkName }),
  setConnecting: (isConnecting) => set({ isConnecting }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setRoles: (roles) => set({ roles }),
  setLocale: (locale) => set({ locale })
}))

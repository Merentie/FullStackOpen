import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  users: [],
  actions: {
    setUser: (newUser) => set({ user: newUser }),
    setUsers: (newUsers) => set({ users: newUsers }),
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUsers = () => useUserStore((state) => state.users)

export const useUserActions = () => useUserStore((state) => state.actions)

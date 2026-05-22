import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  message: null,
  style: null,
  setNotification: (message, style, seconds) => {
    set({ message: message, style: style })
    setTimeout(() => set({ message: null, style: null }), seconds * 1000)
  },
}))

export const useNotificationMessage = () =>
  useNotificationStore((state) => state.message)
export const useNotificationStyle = () =>
  useNotificationStore((state) => state.style)

export const useNotificationActions = () =>
  useNotificationStore((state) => state.setNotification)

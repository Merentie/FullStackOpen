import { create } from 'zustand'

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    setBlogs: (newBlogs) => set({ blogs: newBlogs }),
  },
}))

export const useBlogs = () => useBlogStore((state) => state.blogs)

export const useBlogActions = () => useBlogStore((state) => state.actions)

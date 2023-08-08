import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  about: string | null;
}

interface UserStore {
  user: User;
  set: (user: User) => void;
  remove: () => void;
}

export const userStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      set: (user: User) => set(() => ({user: user})),
      remove: () => set(() => ({user: null})),
    }),
    {
      name: "currentUser" 
    }
  )
)


import { create } from "zustand"
import { persist } from "zustand/middleware";

export type Token = string | null;

interface TokenStore {
  token: Token;
  set: (token: string) => void;
  remove: () => void;
}

export const tokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      token: null,
      set: (token: string) => set(() => ({ token: token })),
      remove: () => set(() => ({ token: null })),
    }),
    {
      name: "token",
    }
  )
);

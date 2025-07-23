import { Role } from "./role";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { shallow } from "zustand/shallow";

interface IntranetState {
  role: Role | undefined;
}

interface IntranetAction {
  setRole: (role: Role) => void;
  logout: () => void;
}

interface IntranetStore extends IntranetState, IntranetAction {}

export const useIntranetStore = create<IntranetStore>()((set) => ({
  role: undefined,
  setRole: (role) => {
    set({ role });
    document.cookie = `role=${true}; path=/; max-age=${365 * 24 * 60 * 60}`;
  },
  logout: () => {
    set({ role: undefined });
    document.cookie = `role=${false}; path=/;`;
  },
}));

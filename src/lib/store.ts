import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IntranetState {
  pinnedHrefs: string[];
}

interface IntranetAction {
  togglePinHref: (href: string) => void;
  resetPinnedHrefs: () => void;
}

interface IntranetStore extends IntranetState, IntranetAction {}

export const DEFAULT_PINNED_HREFS: string[] = [
  "https://docs.google.com/spreadsheets/d/1Qnym4-vOcVDyV2yax6wfX5P2iY9ILoqRNxXGoT_GVaI/",
];

export const useIntranetStore = create<IntranetStore>()(
  persist(
    (set) => ({
      pinnedHrefs: DEFAULT_PINNED_HREFS,
      togglePinHref: (href) =>
        set((state) => {
          const isPinned = state.pinnedHrefs.includes(href);
          return {
            pinnedHrefs: isPinned
              ? state.pinnedHrefs.filter((pinnedHref) => pinnedHref !== href)
              : [...state.pinnedHrefs, href],
          };
        }),
      resetPinnedHrefs: () => set({ pinnedHrefs: DEFAULT_PINNED_HREFS }),
    }),
    {
      name: "intranet-store",
    }
  )
);

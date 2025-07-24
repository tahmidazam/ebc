interface IntranetState {
  pinnedHrefs: string[];
}

interface IntranetAction {
  togglePinHref: (href: string) => void;
}

interface IntranetStore extends IntranetState, IntranetAction {}

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useIntranetStore = create<IntranetStore>()(
  persist(
    (set) => ({
      pinnedHrefs: [
        "https://docs.google.com/spreadsheets/d/1Qnym4-vOcVDyV2yax6wfX5P2iY9ILoqRNxXGoT_GVaI/",
      ],
      togglePinHref: (href) =>
        set((state) => {
          const isPinned = state.pinnedHrefs.includes(href);
          return {
            pinnedHrefs: isPinned
              ? state.pinnedHrefs.filter((pinnedHref) => pinnedHref !== href)
              : [...state.pinnedHrefs, href],
          };
        }),
    }),
    {
      name: "intranet-store",
    }
  )
);

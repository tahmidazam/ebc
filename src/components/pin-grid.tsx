"use client";

import { Collection } from "@/lib/collection-schema";
import { useIntranetStore } from "@/lib/store";
import { AnimatePresence, motion } from "motion/react";
import { useShallow } from "zustand/react/shallow";
import { Card } from "./card";

export function PinGrid({ collections }: { collections: Collection[] }) {
  const pinnedHrefs = useIntranetStore(
    useShallow((state) => state.pinnedHrefs)
  );

  return (
    <motion.div layout>
      <div
        className="grid grid-cols-2 gap-4"
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        <AnimatePresence>
          {pinnedHrefs.map((href) => (
            <Card key={href} href={href} collections={collections} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

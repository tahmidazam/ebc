"use client";

import { useIntranetStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { Card } from "./card";
import { Collection } from "@/lib/collection-schema";

export function PinGrid({ collections }: { collections: Collection[] }) {
  const pinnedHrefs = useIntranetStore(
    useShallow((state) => state.pinnedHrefs)
  );

  return (
    <div
      className="grid grid-cols-2 gap-4"
      style={{
        paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
        paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
      }}
    >
      {pinnedHrefs.map((href) => (
        <Card key={href} href={href} collections={collections} />
      ))}
    </div>
  );
}

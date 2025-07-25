"use client";

import { LabelledHref } from "@/lib/labelled-href-schema";
import { useIntranetStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PinIcon, PinOffIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { PWALink } from "./pwa-link";
import { Separator } from "./ui/separator";

export function LabelledHrefListItem({
  labelledHref,
}: {
  labelledHref: LabelledHref;
}) {
  const togglePinHref = useIntranetStore(
    useShallow((state) => state.togglePinHref)
  );
  const pinnedHrefs = useIntranetStore(
    useShallow((state) => state.pinnedHrefs)
  );

  const togglePinDisabled =
    pinnedHrefs.length >= 6 && !pinnedHrefs.includes(labelledHref.href);

  return (
    <div key={labelledHref.label} className="flex flex-col">
      <div
        className="flex flex-row justify-between items-center py-2"
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 8 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        <PWALink href={labelledHref.href}>{labelledHref.label}</PWALink>

        <button
          disabled={togglePinDisabled}
          onClick={() => togglePinHref(labelledHref.href)}
          className={cn(togglePinDisabled && "text-muted-foreground")}
        >
          {pinnedHrefs.includes(labelledHref.href) ? (
            <>
              <PinOffIcon className="size-4" />
            </>
          ) : (
            <>
              <PinIcon className="size-4" />
            </>
          )}
        </button>
      </div>

      <Separator />
    </div>
  );
}

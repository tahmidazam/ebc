"use client";

import { LabelledHref } from "@/lib/labelled-href-schema";
import { PWALink } from "./pwa-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { EllipsisIcon, PinOffIcon, PinIcon } from "lucide-react";
import { useIntranetStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisIcon className="w-4 h-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              disabled={
                pinnedHrefs.length >= 6 &&
                !pinnedHrefs.includes(labelledHref.href)
              }
              onClick={() => togglePinHref(labelledHref.href)}
            >
              {pinnedHrefs.includes(labelledHref.href) ? (
                <>
                  <span>Unpin</span>
                  <PinOffIcon className="ml-auto size-4" />
                </>
              ) : (
                <>
                  <span>Pin</span>
                  <PinIcon className="ml-auto size-4" />
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />
    </div>
  );
}

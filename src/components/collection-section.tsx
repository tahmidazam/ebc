"use client";

import { Collection } from "@/lib/collection-schema";
import { useIntranetStore } from "@/lib/store";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  EllipsisIcon,
  PinIcon,
  PinOffIcon,
} from "lucide-react";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { PWALink } from "./pwa-link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export function CollectionSection({ collection }: { collection: Collection }) {
  const togglePinHref = useIntranetStore(
    useShallow((state) => state.togglePinHref)
  );
  const pinnedHrefs = useIntranetStore(
    useShallow((state) => state.pinnedHrefs)
  );
  const [open, setOpen] = useState(false);
  return (
    <Collapsible key={collection.title} open={open} className="flex flex-col">
      <div className="flex flex-col">
        <div
          className="flex items-center justify-between"
          style={{
            paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
            paddingRight:
              "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
          }}
        >
          <p className="font-medium py-2">{collection.title}</p>

          <CollapsibleTrigger asChild>
            <div onClick={() => setOpen(!open)}>
              {open ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </div>
          </CollapsibleTrigger>
        </div>

        <Separator />
      </div>

      <CollapsibleContent className="CollapsibleContent flex flex-col">
        {collection.labelledHrefs.map((labelledHref) => (
          <div key={labelledHref.label} className="flex flex-col">
            <div
              className="flex flex-row justify-between items-center py-2"
              style={{
                paddingLeft:
                  "calc(env(safe-area-inset-left) + 8 * var(--spacing))",
                paddingRight:
                  "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
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
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

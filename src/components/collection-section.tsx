"use client";

import { Collection } from "@/lib/collection-schema";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { PWALink } from "./pwa-link";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Separator } from "./ui/separator";

export function CollectionSection({ collection }: { collection: Collection }) {
  const [open, setOpen] = useState(true);
  return (
    <Collapsible key={collection.title} open={open} className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <p
            className="font-medium py-2"
            style={{
              paddingLeft:
                "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
              paddingRight:
                "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
            }}
          >
            {collection.title}
          </p>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" onClick={() => setOpen(!open)}>
              {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </CollapsibleTrigger>
        </div>

        <Separator />
      </div>

      <CollapsibleContent className="CollapsibleContent flex flex-col">
        {collection.labelledHrefs.map((labelledHref) => (
          <div key={labelledHref.label} className="flex flex-col">
            <PWALink
              href={labelledHref.href}
              style={{
                paddingLeft:
                  "calc(env(safe-area-inset-left) + 8 * var(--spacing))",
                paddingRight:
                  "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
              }}
              className="py-2"
            >
              {labelledHref.label}
            </PWALink>

            <Separator />
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

"use client";

import { Collection } from "@/lib/collection-schema";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { LabelledHrefListItem } from "./labelled-href-list-item";
import { Separator } from "./ui/separator";

export function CollectionSection({ collection }: { collection: Collection }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col z-20">
        <div
          className="flex items-center justify-between"
          style={{
            paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
            paddingRight:
              "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
          }}
        >
          <p className="font-medium py-2">{collection.title}</p>

          <div onClick={() => setOpen(!open)}>
            {open ? (
              <ChevronUpIcon className="w-4 h-4" />
            ) : (
              <ChevronDownIcon className="w-4 h-4" />
            )}
          </div>
        </div>

        <Separator />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            style={{ overflow: "hidden" }}
          >
            {collection.labelledHrefs.map((labelledHref) => (
              <LabelledHrefListItem
                key={labelledHref.href}
                labelledHref={labelledHref}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

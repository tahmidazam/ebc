"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useState } from "react";
import { OptionsButton } from "./options-button";
import { Separator } from "./ui/separator";
import { ProgressiveBlur } from "./progressive-blur";

export function Nav({ title }: { title: string }) {
  const { scrollY } = useScroll();
  const [showInlineTitle, setShowInlineTitle] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowInlineTitle(latest > 48);
  });

  return (
    <>
      <ProgressiveBlur />

      <nav className="flex flex-col pt-[env(safe-area-inset-top)] fixed w-full top-0 z-50">
        <div
          className="flex items-center justify-end py-4"
          style={{
            paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
            paddingRight:
              "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
          }}
        >
          <OptionsButton />

          <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
            <AnimatePresence>
              {showInlineTitle && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0)",
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    filter: "blur(2px)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-medium">{title}</h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <div
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">EBC Intranet</h1>
      </div>
    </>
  );
}

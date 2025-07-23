"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { CycleThemeButton } from "./cycle-theme-button";
import { Separator } from "./ui/separator";

export function Nav() {
  const { scrollY } = useScroll();
  const [showSeparator, setShowSeparator] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowSeparator(latest > 52);
    setShowTitle(latest > 24);
  });

  return (
    <nav className="flex flex-col pt-[env(safe-area-inset-top)] fixed w-full top-0 bg-background z-50">
      <div
        className="flex items-center py-4"
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        <CycleThemeButton />
        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: showTitle ? 1 : 0 }}
            className="font-medium"
          >
            EBC Intranet
          </motion.h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSeparator ? 1 : 0 }}
      >
        <Separator />
      </motion.div>
    </nav>
  );
}

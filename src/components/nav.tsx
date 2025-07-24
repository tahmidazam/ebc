"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { CycleThemeButton } from "./cycle-theme-button";
import { Separator } from "./ui/separator";
import { FeedbackButton } from "./feedback-button";
import { LogoutButton } from "./logout-button";

export function Nav({ title, subtitle }: { title: string; subtitle: string }) {
  const { scrollY } = useScroll();
  const [showSeparator, setShowSeparator] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowSeparator(latest > 70);
    setShowTitle(latest > 24);
  });

  return (
    <nav className="flex flex-col pt-[env(safe-area-inset-top)] fixed w-full top-0 bg-background z-50">
      <div
        className="flex items-center justify-between py-4"
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        <div className="flex gap-2 items-center">
          <CycleThemeButton />

          <FeedbackButton />
        </div>

        <LogoutButton />

        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showTitle ? 1 : 0 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-medium">{title}</h1>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </motion.div>
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

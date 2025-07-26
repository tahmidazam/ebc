"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { OptionsButton } from "./options-button";
import { Separator } from "./ui/separator";
import { ProgressiveBlur } from "./progressive-blur";

export function Nav({ title, subtitle }: { title: string; subtitle: string }) {
  const { scrollY } = useScroll();
  const [showInlineTitle, setShowInlineTitle] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowInlineTitle(latest > 48);
  });

  return (
    <nav className="flex flex-col pt-[env(safe-area-inset-top)] fixed w-full top-0 z-50">
      <div
        className="flex items-center justify-end py-4"
        style={{
          paddingLeft: "calc(env(safe-area-inset-left) + 4 * var(--spacing))",
          paddingRight: "calc(env(safe-area-inset-right) + 4 * var(--spacing))",
        }}
      >
        <OptionsButton />

        <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
          <motion.div
            initial={{
              opacity: 0,
              transform: "translateY(20px)",
              filter: "blur(4px)",
            }}
            animate={{
              opacity: showInlineTitle ? 1 : 0,
              transform: showInlineTitle ? "translateY(0)" : "translateY(20px)",
              filter: showInlineTitle ? "blur(0)" : "blur(4px)",
            }}
            className="flex flex-col items-center"
          >
            <h1 className="font-medium">{title}</h1>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}

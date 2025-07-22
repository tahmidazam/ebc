"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SunIcon, MoonIcon, LaptopMinimalIcon } from "lucide-react";

export function CycleThemeButton() {
  const { theme, setTheme, themes } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const nextTheme = () => {
    const currentIndex = themes.indexOf(theme || "system");
    const next = themes[(currentIndex + 1) % themes.length];
    setTheme(next);
  };

  const Icon = {
    light: <SunIcon className="w-4 h-4" />,
    dark: <MoonIcon className="w-4 h-4" />,
    system: <LaptopMinimalIcon className="w-4 h-4" />,
  }[theme || "system"];

  return (
    <Button variant="outline" size="icon" onClick={nextTheme}>
      {Icon}
    </Button>
  );
}

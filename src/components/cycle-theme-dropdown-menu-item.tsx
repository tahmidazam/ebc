"use client";

import { LaptopMinimalIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function CycleThemeDropdownMenuItem() {
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
    light: <SunIcon className="ml-auto size-4" />,
    dark: <MoonIcon className="ml-auto size-4" />,
    system: <LaptopMinimalIcon className="ml-auto size-4" />,
  }[theme || "system"];

  return (
    <DropdownMenuItem onClick={nextTheme} onSelect={(e) => e.preventDefault()}>
      Cycle Theme{Icon}
    </DropdownMenuItem>
  );
}

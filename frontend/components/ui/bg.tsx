"use client";

import { useTheme } from "next-themes";

import { Particles } from "./particles";

export default function Bg() {
  const { theme } = useTheme();
  return (
    <Particles
      className="absolute inset-0 z-0"
      quantity={350}
      ease={80}
      color={theme === "dark" ? "#ffffff" : "#000000"}
      refresh
    />
  );
}

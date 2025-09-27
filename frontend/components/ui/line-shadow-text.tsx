"use client";

import type { MotionProps } from "motion/react";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type LineShadowTextProps = {
  shadowColor?: string;
  as?: React.ElementType;
} & Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> & MotionProps;

export function LineShadowText({
  children,
  className,
  as: Component = "span",
  ...props
}: LineShadowTextProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const MotionComponent = motion.create(Component);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = typeof children === "string" ? children : null;
  if (!content) {
    throw new Error("LineShadowText only accepts string content");
  }

  if (!mounted)
    return null;

  return (
    <MotionComponent
      style={{ "--shadow-color": theme === "dark" ? "#ffffff" : "#000000" } as React.CSSProperties}
      className={cn(
        "relative z-0 inline-flex",
        "after:absolute after:top-[0.04em] after:left-[0.04em] after:content-[attr(data-text)]",
        "after:bg-[linear-gradient(45deg,transparent_45%,var(--shadow-color)_45%,var(--shadow-color)_55%,transparent_0)]",
        "after:-z-10 after:bg-[length:0.06em_0.06em] after:bg-clip-text after:text-transparent",
        "after:animate-line-shadow",
        className,
      )}
      data-text={content}
      {...props}
    >
      {content}
    </MotionComponent>
  );
}

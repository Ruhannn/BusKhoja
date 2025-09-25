"use client";

import { motion } from "framer-motion";
import { Bus, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
            >
              <Bus className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold text-foreground">Bus Khoja</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6  justify-center text-[16px] font-medium tracking-wide [&:has(a:hover)_a:not(:hover)]:text-muted-foreground [&_a:hover]:text-foreground">
            <Link
              href="/"
              className={cn(
                "cursor-pointer transition-colors duration-300 text-sm font-medium text-muted-foreground hover:text-primary",
                pathname === "/" && "underline",
              )}
            >
              Home
            </Link>
            <Link
              href="/routes"
              className={cn(
                "cursor-pointer transition-colors duration-300 text-sm font-medium text-muted-foreground hover:text-primary",
                pathname === "/routes" && "underline",
              )}
            >
              Routes
            </Link>
            <Link
              href="/about"
              className={cn(
                "cursor-pointer transition-colors duration-300 text-sm font-medium text-muted-foreground hover:text-primary",
                pathname === "/about" && "underline",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={cn(
                "cursor-pointer transition-colors duration-300 text-sm font-medium text-muted-foreground hover:text-primary",
                pathname === "/contact" && "underline",
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t py-4"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/routes"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Routes
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}

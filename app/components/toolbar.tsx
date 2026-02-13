"use client";

import Link from "next/link";
import { ChevronLeft, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function Toolbar({ showBack = false }: { showBack?: boolean }) {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="toolbar">
      {showBack ? (
        <Link href="/" className="icon-button" aria-label="Back to home">
          <ChevronLeft size={18} />
        </Link>
      ) : (
        <span />
      )}
      <button
        className="icon-button"
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </nav>
  );
}

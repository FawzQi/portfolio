// src/hooks/useDarkMode.js — Custom hook to manage dark/light mode`
import { useState, useEffect } from "react";

export function useDarkMode() {
  // Check localStorage first, then system preference
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "light";
    return window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return { isDark, toggle };
}

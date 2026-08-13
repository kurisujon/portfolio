"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const subscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false)

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-zinc-200 dark:bg-white/5 border border-zinc-300 dark:border-white/10 hover:bg-zinc-300 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-zinc-400 hover:text-white transition-colors" />
      ) : (
        <Moon className="h-4 w-4 text-zinc-600 hover:text-black transition-colors" />
      )}
    </button>
  )
}

"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextValue {
    theme: Theme
    toggle: () => void
    setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext)
    if (!ctx) {
        return { theme: "light", toggle: () => { }, setTheme: () => { } }
    }
    return ctx
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("light")

    useEffect(() => {
        const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null
        const initial: Theme = stored === "dark" || stored === "light" ? stored : "light"
        setThemeState(initial)
        document.documentElement.setAttribute("data-theme", initial)
    }, [])

    const setTheme = useCallback((t: Theme) => {
        setThemeState(t)
        document.documentElement.setAttribute("data-theme", t)
        try { localStorage.setItem("theme", t) } catch { }
    }, [])

    const toggle = useCallback(() => {
        setTheme(theme === "light" ? "dark" : "light")
    }, [theme, setTheme])

    return (
        <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

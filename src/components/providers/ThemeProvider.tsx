"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false);
  
    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);
  
    if (!mounted) {
        return <>{children}</>;
    }
  
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
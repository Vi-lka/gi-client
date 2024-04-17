"use client"

import React from 'react'
import DictionaryProvider from './DictionaryProvider'
import ThemeProvider from './ThemeProvider'

export default function Providers({
    dictionary,
    children,
}: {
    dictionary: Dictionary
    children: React.ReactNode
}) {
    return (
        <ThemeProvider
            attribute="class" 
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <DictionaryProvider dictionary={dictionary}>
                {children}
            </DictionaryProvider>
        </ThemeProvider>
    )
}

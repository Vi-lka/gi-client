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
        <DictionaryProvider dictionary={dictionary}>
            <ThemeProvider
                attribute="class" 
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </DictionaryProvider>
    )
}

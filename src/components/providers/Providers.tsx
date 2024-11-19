"use client"

import React from 'react'
import DictionaryProvider from './DictionaryProvider'
import ThemeProvider from './ThemeProvider'
import { SWRProvider } from './SWRProvider'
import { Provider as JotaiProvider } from "jotai"
import dynamic from 'next/dynamic'

const ScrollToAnchor = dynamic(() => import('./ScrollToAnchor'), { ssr: false })

export default function Providers({
    dictionary,
    children,
}: {
    dictionary: Dictionary
    children: React.ReactNode
}) {
    return (
        <JotaiProvider>
            <ThemeProvider
                attribute="class" 
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <DictionaryProvider dictionary={dictionary}>
                    <SWRProvider>
                        <ScrollToAnchor>
                            {children}
                        </ScrollToAnchor>
                    </SWRProvider>
                </DictionaryProvider>
            </ThemeProvider>
        </JotaiProvider>
    )
}

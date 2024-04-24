"use client"

import React from 'react'
import Link from './Link'
import { Button } from './ui/button'
import { useDictionary } from './providers/DictionaryProvider'
import { useLocale } from '@/lib/hooks/useLocale'
import { cn } from '@/lib/utils'

export default function MoreButton({ 
    href,
    variant = "default",
    children,
    className 
}: { 
    href: string,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null,
    children?: React.ReactNode,
    className?: string,
}) {
    const dict = useDictionary()
    const locale = useLocale()

    return (
        <Link locale={locale} href={href} className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
            <Button variant={variant} className={cn('uppercase font-medium px-10 py-5 rounded-3xl', className)} >
                {dict.Buttons.more} 
                {children}
            </Button>
        </Link>
    )
}

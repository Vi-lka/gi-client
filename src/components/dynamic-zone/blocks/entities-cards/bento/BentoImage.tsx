"use client"

import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import { useLocale } from '@/lib/hooks/useLocale'
import { cn } from '@/lib/utils'
import React from 'react'

export default function BentoImage({
    href,
    src,
    alt,
    sizes = '(max-width: 1024px) 100vw, 70vw',
    className,
}: {
    href: string,
    src: string | undefined,
    alt: string,
    sizes?: string,
    className?:string,
}) {
    const locale = useLocale()

    if (!src) return null
    
    return (
        <Link 
            locale={locale} 
            href={href} 
            className={cn(
                'relative w-full min-h-24 rounded-2xl overflow-hidden',
                className
            )}
        >
            <ImageComp
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className='object-cover'
            />
        </Link>
    )
}

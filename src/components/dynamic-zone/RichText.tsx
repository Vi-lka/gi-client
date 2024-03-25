import React from 'react'
import { cn } from '@/lib/utils'
import BlocksRendererStrapi from '../BlocksRendererStrapi'
import { TypographyH2 } from '../typography'

export default function RichText({
    title,
    text,
    className,
}: {
    title: string | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    text: any,
    className?: string,
}) {
    return (
        <div className={cn("w-full", className)}>
            {title && (
                <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                    {title}
                </TypographyH2>
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <BlocksRendererStrapi content={text} />
        </div>
    )
}
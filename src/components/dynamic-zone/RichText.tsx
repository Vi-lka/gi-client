import React from 'react'
import { cn } from '@/lib/utils'
import BlocksRendererStrapi from '../BlocksRendererStrapi'
import { TypographyH2 } from '../typography'
import type { TextCompT } from '@/lib/types'

export default function RichText({
    data,
    className,
}: {
    data: TextCompT,
    className?: string,
}) {
    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                    {data.title}
                </TypographyH2>
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <BlocksRendererStrapi content={data.text} />
        </div>
    )
}
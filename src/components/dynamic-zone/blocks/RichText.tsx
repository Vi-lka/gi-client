import React from 'react'
import { cn } from '@/lib/utils'
import type { TextCompT } from '@/lib/types'
import { TypographyH2 } from '@/components/typography'
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'

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
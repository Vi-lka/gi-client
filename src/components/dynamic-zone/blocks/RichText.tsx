import React from 'react'
import { cn } from '@/lib/utils'
import { TypographyH2 } from '@/components/typography'
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'
import type { TextCompT } from '@/lib/types/components'

export default function RichText({
    data,
    headingBig,
    className,
}: {
    data: TextCompT,
    headingBig?: boolean,
    className?: string,
}) {
    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2 
                    className={cn(
                        'font-semibold text-primary mb-6 border-none',
                        headingBig ? "text-4xl lg:text-5xl" : ""
                    )}
                >
                    {data.title}
                </TypographyH2>
            )}
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <BlocksRendererStrapi content={data.text} />
        </div>
    )
}
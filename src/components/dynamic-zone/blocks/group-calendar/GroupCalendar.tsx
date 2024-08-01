import { TypographyH2 } from '@/components/typography'
import type { GroupCalendarCompT } from '@/lib/types/components'
import { cn } from '@/lib/utils'
import React from 'react'

export default function GroupCalendar({
    data,
    headingBig,
    className
}: {
    data: GroupCalendarCompT,
    headingBig?: boolean,
    className?: string
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
            GroupCalendar
        </div>
    )
}

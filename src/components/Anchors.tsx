import type { DynamicZoneT } from '@/lib/types'
import { Link } from '@/navigation'
import React from 'react'

export default function Anchors({
    data
}: {
    data: DynamicZoneT[]
}) {
    const anchors = data.map(item => {
        const label = item.linkTitle ? item.linkTitle : item.title
        const link = item.link !== null ? "#" + item.link : null
        return { label, link }
    })

    return (
        <div className='flex flex-wrap gap-y-3 lg:gap-x-6 gap-x-3 mt-6'>
            {anchors.map((anchor, index) => {
                if (typeof anchor.label === "string" && typeof anchor.link === "string") return (
                    <Link 
                        key={index}
                        href={anchor.link}
                        className="h-fit text-sm 2xl:py-2 py-1 2xl:px-6 md:px-3 group inline-flex w-max items-center justify-center rounded-full bg-card text-primary px-4 font-semibold transition-colors hover:bg-primary hover:text-background focus:bg-primary focus:text-background focus:outline-none"
                    >
                        {anchor.label}
                    </Link>
                )
            })}
        </div>
    )
}

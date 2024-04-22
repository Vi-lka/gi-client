"use client"

import { cn, splitArray } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import DynamicReactIcon from '@/components/DynamicReactIcon'
import type { IconsBlockItemT } from '@/lib/types/components'
import ImageComp from '@/components/ImageComp'

export default function IconsBlockItems({
    items,
    isList
}: {
    items: IconsBlockItemT[],
    isList: boolean
}) {

    const [width, setWidth] = useState(window?.innerWidth);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", updateDimensions);
        }
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    let splitSize: number

    if (isList) splitSize = 1
    else if (width >= 1024) splitSize = 4
    else if (width >= 640) splitSize = 2
    else splitSize = 1

    return (
        <div className='flex flex-col gap-8'>
            {splitArray(items, splitSize).map((arr, index) => (
                <div key={index} className='flex flex-col gap-2 sm:items-stretch items-center sm:text-left text-center'>
                    <IconBlockLine items={arr} type='icon' />
                    <IconBlockLine items={arr} type='title' />
                    <IconBlockLine items={arr} type='description' />
                </div>
            ))}
        </div>
    )
}

function IconBlockLine({
    items,
    type
}: {
    items: IconsBlockItemT[],
    type: "icon" | "title" | "description",
}) {

    return (
        <ul 
            className={cn(
                'grid gap-8',
                type === "icon" ? "lg:mb-4" : ""
            )}
            style={items.length >= 4
                ? {gridTemplateColumns: "repeat(4, minmax(0, 1fr))"} 
                : {gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`}
            }
        >
            {items.map((item, index) => (
                <li key={item.title + "-" + index}>
                    <IconBlockItem item={item} type={type} />
                </li>
            ))}
        </ul>
    )
}

function IconBlockItem({
    item,
    type,
    className,
}: {
    item: IconsBlockItemT,
    type: "icon" | "title" | "description",
    className?: string,
}) {
    switch (type) {
        case "icon":
            if (item.iconReact) return <DynamicReactIcon icon={item.iconReact} className={cn("w-auto lg:h-20 sm:h-16 h-14 text-secondary-foreground", className)} />
            else if (item.image.data) return (
                <div>
                    <ImageComp
                        src={item.image.data.attributes.url}
                        alt='Icon'
                        fill={false}
                        width={80}
                        height={80}
                        className={cn(
                            'lg:h-20 sm:h-16 h-14 aspect-square object-contain', 
                            className,
                            item.imageDark.data ? "dark:hidden" : "dark:!filter-background"
                        )}
                    />
                    {item.imageDark.data && (
                        <ImageComp 
                            src={item.imageDark.data.attributes.url} 
                            alt='Icon'
                            fill={false}
                            width={80}
                            height={80}
                            className={cn(
                                'lg:h-20 sm:h-16 h-14 aspect-square object-contain hidden dark:block', 
                                className,
                            )}
                        />
                    )}
                </div>
            )
            else return null

        case "title":
            return <h3 className={cn('font-semibold text-sm', className)}>{item.title}</h3>
        case "description":
            return <p className={cn('text-sm text-foreground dark:text-muted-foreground', className)}>{item.description}</p>
    }
}

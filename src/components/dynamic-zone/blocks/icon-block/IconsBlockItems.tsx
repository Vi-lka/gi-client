"use client"

import type { IconsBlockItemT } from '@/lib/types'
import { cn, splitArray } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import IconCustom from '../../../IconCustom'
import DynamicReactIcon from '@/components/DynamicReactIcon'

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
            {items.map(item => (
                <li key={item.title}>
                    <IconBlockItem item={item} type={type} />
                </li>
            ))}
        </ul>
    )
}

function IconBlockItem({
    item,
    type,
}: {
    item: IconsBlockItemT,
    type: "icon" | "title" | "description"
}) {
    switch (type) {
        case "icon":
            if (item.iconCustom) return <IconCustom icon={item.iconCustom} className='w-auto lg:h-20 sm:h-16 h-14 filter-secondary-foreground' />
            else if (item.iconReact) return <DynamicReactIcon icon={item.iconReact} className="w-auto lg:h-20 sm:h-16 h-14 text-secondary-foreground" />
            else return null

        case "title":
            return <h3 className='font-semibold text-sm'>{item.title}</h3>
        case "description":
            return <p className='text-sm'>{item.description}</p>
    }
}

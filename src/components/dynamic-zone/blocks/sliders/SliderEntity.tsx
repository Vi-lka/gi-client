"use client"

import CarouselComp from '@/components/CarouselComp'
import { TypographyH2 } from '@/components/typography'
import type { SliderEntityCompT } from '@/lib/types'
import { cn, splitArray } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import EducationalProgramsItem from './EducationalProgramsItem'
import EmployeesItem from './EmployeesItem'
import { useLocale } from '@/lib/hooks/useLocale'

export default function SliderEntity({
    data,
    headingBig,
    className
}: {
    data: SliderEntityCompT,
    headingBig?: boolean,
    className?: string
}) {

    const locale = useLocale()

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

    if (width >= 1024) splitSize = 3
    else if (width >= 640) splitSize = 2
    else splitSize = 1

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
            {data.educational_programs.data.length > 0 && (
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {data.educational_programs.data.map(item => (
                        <EducationalProgramsItem key={item.id} locale={locale} item={item} />
                    ))}
                </CarouselComp>
            )}
            {data.employees.data.length > 0 && (
                <>
                    <CarouselComp className='lg:-ml-8 -ml-4'>
                        {splitArray(data.employees.data, splitSize).map((arr, index) => (
                            <EmployeesItem key={index} arr={arr} />
                        ))}
                    </CarouselComp>
                </>
            )}
        </div>
    )
}

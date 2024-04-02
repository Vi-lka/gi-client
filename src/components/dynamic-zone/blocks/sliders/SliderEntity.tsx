import CarouselComp from '@/components/CarouselComp'
import { TypographyH2 } from '@/components/typography'
import type { SliderEntityCompT } from '@/lib/types'
import { cn, splitArray } from '@/lib/utils'
import React from 'react'
import EducationalProgramsItem from './EducationalProgramsItem'
import EmployeesItem from './EmployeesItem'

export default function SliderEntity({
    data,
    headingBig,
    className
}: {
    data: SliderEntityCompT,
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
            {data.educational_programs.data.length > 0 && (
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {data.educational_programs.data.map(item => (
                        <EducationalProgramsItem key={item.id} item={item} />
                    ))}
                </CarouselComp>
            )}
            {data.employees.data.length > 0 && (
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {splitArray(data.employees.data, 3).map((arr, index) => (
                        <EmployeesItem key={index} arr={arr} />
                    ))}
                </CarouselComp>  
            )}
        </div>
    )
}

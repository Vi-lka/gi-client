import CarouselComp from '@/components/CarouselComp'
import { TypographyH2 } from '@/components/typography'
import type { SliderEntityCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'
import EducationalProgramsItem from './EducationalProgramsItem'

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
            <CarouselComp className='lg:-ml-8 -ml-4'>
                {data.educational_programs.data.map(item => (
                    <EducationalProgramsItem key={item.id} item={item} />
                ))}
            </CarouselComp>
        </div>
    )
}

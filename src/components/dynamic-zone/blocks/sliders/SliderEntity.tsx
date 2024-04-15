import CarouselComp from '@/components/CarouselComp'
import { TypographyH2 } from '@/components/typography'
import type { SliderEntityCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'
import EducationalProgramsItem from './EducationalProgramsItem'
import SplitSlider from './SplitSlider'
import { headers } from 'next/headers'
import { ClientHydration } from '@/components/ClientHydration'
import SplitSliderLoading from '@/components/loadings/SplitSliderLoading'

export default function SliderEntity({
    data,
    headingBig,
    className
}: {
    data: SliderEntityCompT,
    headingBig?: boolean,
    className?: string
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

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
                <ClientHydration fallback={<SplitSliderLoading />}>
                    <SplitSlider data={data.employees.data} />
                </ClientHydration>
            )}
        </div>
    )
}

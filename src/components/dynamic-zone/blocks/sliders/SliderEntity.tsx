import CarouselComp from '@/components/CarouselComp'
import { TypographyH2 } from '@/components/typography'
import { cn } from '@/lib/utils'
import React from 'react'
import EducationalProgramsItem from '../entities-cards/EducationalProgramsItem'
import SplitSlider from './SplitSlider'
import { headers } from 'next/headers'
import { ClientHydration } from '@/components/ClientHydration'
import SplitSliderLoading from '@/components/loadings/SplitSliderLoading'
import DpoCoursesItem from '../entities-cards/DpoCoursesItem'
import { CarouselItem } from '@/components/ui/carousel'
import { getDictionary } from '@/lib/getDictionary'
import type { SliderEntityCompT } from '@/lib/types/components'
import DepartmentsItem from '../entities-cards/DepartmentsItem'

export default async function SliderEntity({
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

    const dict = await getDictionary(locale)

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
                        <CarouselItem key={"edu-program" + item.id} className='lg:basis-1/3 sm:basis-1/2 lg:pl-8 pl-4'>
                            <EducationalProgramsItem locale={locale} item={item} buttonTitle={dict.Buttons.more} />
                        </CarouselItem>
                    ))}
                </CarouselComp>
            )}
            {data.dpo_courses.data.length > 0 && (
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {data.dpo_courses.data.map(item => (
                        <CarouselItem key={"dpo-course" + item.id} className='lg:basis-1/2 lg:pl-8 pl-4'>
                            <DpoCoursesItem locale={locale} item={item} dict={dict} />
                        </CarouselItem>
                    ))}
                </CarouselComp>
            )}
            {data.departments.data.length > 0 && (
                <CarouselComp className='lg:-ml-8 -ml-4'>
                    {data.departments.data.map(item => (
                        <CarouselItem key={"department" + item.id} className='lg:basis-1/2 lg:pl-8 pl-4'>
                            <DepartmentsItem locale={locale} item={item} dict={dict} />
                        </CarouselItem>
                    ))}
                </CarouselComp>
            )}
            {data.employees.data.length > 0 && (
                <ClientHydration fallback={<SplitSliderLoading />}>
                    <SplitSlider data={data.employees.data} />
                </ClientHydration>
            )}
            {data.graduates.data.length > 0 && (
                <ClientHydration fallback={<SplitSliderLoading />}>
                    <SplitSlider data={data.graduates.data} />
                </ClientHydration>
            )}
        </div>
    )
}

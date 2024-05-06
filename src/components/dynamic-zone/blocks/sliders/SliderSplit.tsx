"use client"

import CarouselComp from '@/components/CarouselComp';
import { CarouselItem } from '@/components/ui/carousel';
import { cn, splitArray } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { useLocale } from '@/lib/hooks/useLocale';
import { EmployeeSingleT, GraduateSingleT } from '@/lib/types/entities';
import dynamic from 'next/dynamic';
import EmployeeLoading from '@/components/loadings/items/EmployeeLoading';
import GraduateLoading from '@/components/loadings/items/GraduateLoading';

const EmployeesItem = dynamic(
    () => import('../entities-cards/EmployeesItem'), {loading: () => <EmployeeLoading />}
)
const GraduatesItem = dynamic(
    () => import('../entities-cards/GraduatesItem'), {loading: () => <GraduateLoading />}
)

export default function SliderSplit({
    data,
    config,
    className
}: {
    data: (EmployeeSingleT | GraduateSingleT)[],
    config?: {
        showContacts: boolean,
        showHashtags: boolean
    } | null,
    className?: string
}) {
    const locale = useLocale();

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
        <CarouselComp className={cn('lg:-ml-8 -ml-4', className)} >
            {splitArray(data, splitSize).map((arr, index) => (
                <CarouselItem 
                    key={index}
                    className={cn(
                        'md:basis-1/2 lg:pl-8 pl-4 grid lg:grid-rows-3 sm:grid-rows-2 grid-rows-1 gap-8',
                        data.length === 1 && "lg:grid-rows-1 sm:grid-rows-1",
                        data.length === 2 && "lg:grid-rows-2 sm:grid-rows-2"
                    )}
                >
                    {arr.map(item => {
                        const employeeResult = EmployeeSingleT.safeParse(item)
                        const graduateResult = GraduateSingleT.safeParse(item)

                        if (employeeResult.success) return (
                            <EmployeesItem key={"employee" + item.id} locale={locale} employee={employeeResult.data} config={config} />
                        )
                        if (graduateResult.success) return (
                            <GraduatesItem key={"graduate" + item.id} graduate={graduateResult.data} />
                        )
                    })}
                </CarouselItem>
            ))}
        </CarouselComp>
    )
}

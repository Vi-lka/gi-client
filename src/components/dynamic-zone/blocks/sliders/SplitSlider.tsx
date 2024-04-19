"use client"

import CarouselComp from '@/components/CarouselComp'
import { CarouselItem } from '@/components/ui/carousel'
import { cn, splitArray } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import EmployeesItem from '../entities-cards/EmployeesItem'
import GraduatesItem from '../entities-cards/GraduatesItem'
import { EmployeeSingleT, GraduateSingleT } from '@/lib/types/entities'

export default function SplitSlider({
    data,
    className,
}: {
    data: EmployeeSingleT[] | GraduateSingleT[];
    className?: string;
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

    if (width >= 1024) splitSize = 3
    else if (width >= 640) splitSize = 2
    else splitSize = 1

    const EmployeeArrayT = EmployeeSingleT.array()
    const GraduateArrayT = GraduateSingleT.array()

    const employeeResult = EmployeeArrayT.safeParse(data)
    const graduateResult = GraduateArrayT.safeParse(data)

    if (employeeResult.success) return (
        <CarouselComp className={cn('lg:-ml-8 -ml-4', className)} >
            {splitArray(employeeResult.data, splitSize).map((arr, index) => (
                <CarouselItem 
                    key={index}
                    className={cn(
                        'md:basis-1/2 lg:pl-8 pl-4 grid lg:grid-rows-3 sm:grid-rows-2 grid-rows-1 gap-8',
                        employeeResult.data.length === 1 && "lg:grid-rows-1 sm:grid-rows-1",
                        employeeResult.data.length === 2 && "lg:grid-rows-2 sm:grid-rows-2"
                    )}
                >
                    {arr.map(employee => (
                        <EmployeesItem key={"employee" + employee.id} employee={employee} />
                    ))}
                </CarouselItem>
            ))}
        </CarouselComp>
    )

    if (graduateResult.success) return (
        <CarouselComp className={cn('lg:-ml-8 -ml-4', className)} >
            {splitArray(graduateResult.data, splitSize).map((arr, index) => (
                <CarouselItem 
                    key={index}
                    className={cn(
                        'md:basis-1/2 lg:pl-8 pl-4 grid lg:grid-rows-3 sm:grid-rows-2 grid-rows-1 gap-8',
                        graduateResult.data.length === 1 && "lg:grid-rows-1 sm:grid-rows-1",
                        graduateResult.data.length === 2 && "lg:grid-rows-2 sm:grid-rows-2"
                    )}
                >
                    {arr.map(graduate => (
                        <GraduatesItem key={"graduate" + graduate.id} graduate={graduate} />
                    ))}
                </CarouselItem>
            ))}
        </CarouselComp>
    )

    return null
}

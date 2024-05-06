import React from 'react'
import { cn } from '@/lib/utils';
import { TypographyH2 } from '@/components/typography';
import type { CollectionAllCompT } from '@/lib/types/components';
import dynamic from 'next/dynamic';
import SliderGraduatesLoading from '@/components/loadings/SliderGraduatesLoading';
import EducationalProgramsLoading from '@/components/loadings/EducationalProgramsLoading';
import DpoCoursesLoading from '@/components/loadings/DpoCoursesLoading';
import EmployeesLoading from '@/components/loadings/EmployeesLoading';
import BentoLoading from '@/components/loadings/BentoLoading';

const EducationalProgramsAll = dynamic(
    () => import('./EducationalProgramsAll'), {loading: () => <EducationalProgramsLoading />}
)
const DpoCoursesAll = dynamic(
    () => import('./DpoCoursesAll'), {loading: () => <DpoCoursesLoading />}
)
const DepartmentsAll = dynamic(
    () => import('./DepartmentsAll'), {loading: () => <BentoLoading />}
)
const EmployeesAll = dynamic(
    () => import('./EmployeesAll'), {loading: () => <EmployeesLoading />}
)
const GraduatesAll = dynamic(
    () => import('./GraduatesAll'), {loading: () => <SliderGraduatesLoading />}
)

export default function CollectionAll({ 
    data,
    searchParams,
    headingBig,
    className,
}: { 
    data: CollectionAllCompT,
    searchParams: { [key: string]: string | string[] | undefined },
    headingBig?: boolean,
    className?: string,
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
            {data.entity.map((item, index) => {
                switch (item) {
                    case "educational-programs":
                        return <EducationalProgramsAll key={index} searchParams={searchParams} data={data} />;
                    
                    case "dpo-courses":
                        return <DpoCoursesAll key={index} searchParams={searchParams} data={data} />;

                    case "departments":
                        return <DepartmentsAll data={data} searchParams={searchParams}/>

                    case "employees":
                        return <EmployeesAll key={index} searchParams={searchParams} data={data} />;
                    
                    case "graduates":
                        return <GraduatesAll key={index} searchParams={searchParams} data={data} />
                
                    default:
                        return null;
                }
            })}
        </div>
    )
}
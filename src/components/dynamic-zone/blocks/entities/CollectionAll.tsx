import type { CollectionAllCompT } from '@/lib/types'
import React from 'react'
import EducationalProgramsAll from './EducationalProgramsAll';
import DpoCoursesAll from './DpoCoursesAll';
import LecturersAll from './LecturersAll';
import GraduatesAll from './GraduatesAll';
import { cn } from '@/lib/utils';
import { TypographyH2 } from '@/components/typography';

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
                        return <EducationalProgramsAll key={index} searchParams={searchParams} />;
                    
                    case "dpo-courses":
                        return <DpoCoursesAll key={index} searchParams={searchParams} />;

                    case "lecturers":
                        return <LecturersAll key={index} />;
                    
                    case "graduates":
                        return <GraduatesAll key={index} searchParams={searchParams} />
                
                    default:
                        return null;
                }
            })}
        </div>
    )
}

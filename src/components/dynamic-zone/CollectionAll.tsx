import type { CollectionAllCompT } from '@/lib/types'
import React from 'react'
import EducationalProgramsAll from './entities/EducationalProgramsAll';
import AdditionalEducationAll from './entities/AdditionalEducationAll';
import LecturersAll from './entities/LecturersAll';
import GraduatesAll from './entities/GraduatesAll';
import { cn } from '@/lib/utils';
import { TypographyH2 } from '../typography';

export default function CollectionAll({ 
    data,
    searchParams,
    className,
}: { 
    data: CollectionAllCompT,
    searchParams: { [key: string]: string | string[] | undefined },
    className?: string,
}) {

    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                    {data.title}
                </TypographyH2>
            )}
            {data.entity.map((item, index) => {
                switch (item) {
                    case "educational-programs":
                        return <EducationalProgramsAll key={index} searchParams={searchParams} />;
                    
                    case "additional-education":
                        return <AdditionalEducationAll key={index} />;

                    case "lecturers":
                        return <LecturersAll key={index} />;
                    
                    case "graduates":
                        return <GraduatesAll key={index} />
                
                    default:
                        return null;
                }
            })}
        </div>
    )
}

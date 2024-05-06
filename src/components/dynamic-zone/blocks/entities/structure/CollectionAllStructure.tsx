import { TypographyH2 } from '@/components/typography';
import type { CollectionAllStructureCompT } from '@/lib/types/components';
import { cn } from '@/lib/utils';
import React from 'react'
import DepartmentsAll from './DepartmentsAll';

export default function CollectionAllStructure({ 
    data,
    searchParams,
    headingBig,
    className,
}: { 
    data: CollectionAllStructureCompT,
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

            <DepartmentsAll data={data} searchParams={searchParams}/>
        </div>
        
    )
}

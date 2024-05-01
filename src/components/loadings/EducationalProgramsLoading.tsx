import React from 'react'
import EducationalProgramLoading from './items/EducationalProgramLoading'
import { Skeleton } from '../ui/skeleton'

export default function EducationalProgramsLoading() {
    return (
        <div className='w-full'>
            <Skeleton className='w-full h-12'/>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-fr lg:gap-8 gap-6 mt-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <EducationalProgramLoading key={index} />
                ))}
            </div>
        </div>
    )
}

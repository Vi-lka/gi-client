import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TextLoading() {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-6'/>
            <div className='w-full flex flex-col gap-3'>
                {Array.from({ length: 16 }).map((_, index) => (
                    <Skeleton key={index} className='w-full lg:h-6 h-5'/>
                ))}
            </div>
        </div>
    ) 
}

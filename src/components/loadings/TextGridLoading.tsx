import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TextGridLoading() {
    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                    <Skeleton className='w-[50%] h-8 mb-3'/>
                    <Skeleton className='w-[90%] aspect-square'/>
                </div>
            ))}
        </div>
    )
}

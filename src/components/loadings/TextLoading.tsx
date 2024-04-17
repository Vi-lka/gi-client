import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TextLoading() {
    return (
        <div className='w-full flex flex-col gap-3'>
            {Array.from({ length: 16 }).map((_, index) => (
                <Skeleton key={index} className='w-full h-6'/>
            ))}
        </div>
    ) 
}

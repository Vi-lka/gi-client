import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ListLoading() {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-8'/>

            <ul className="flex flex-col gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <li key={index} className='flex items-center md:w-[80%] gap-2'>
                        <Skeleton className='w-7 h-7 rounded-full' />
                        <Skeleton className='w-full py-1 lg:h-6 h-5'/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

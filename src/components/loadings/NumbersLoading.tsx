import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function NumbersLoading() {
    return (
        <div className='w-full'>
            <Skeleton className='mb-8 md:w-32 w-full h-9 mx-auto'/>
            <ul className="flex flex-wrap justify-items-center gap-6">
                {Array.from({ length: 2 }).map((_, index) => (
                    <li key={index} className='flex flex-col w-[calc(50%-1.5rem)] flex-grow odd:items-end odd:text-right odd:ml-auto even:mr-auto'>
                        <Skeleton className=' w-16 h-10'/>
                        <Skeleton className='max-w-80 mt-1 w-28 h-6'/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

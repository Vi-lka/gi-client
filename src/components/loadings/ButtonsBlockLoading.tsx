import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ButtonsBlockLoading() {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-8'/>

            <ul className="flex flex-wrap gap-4 w-full justify-evenly">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className='w-full max-w-40'>
                        <Skeleton className='w-full h-[42px]'/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

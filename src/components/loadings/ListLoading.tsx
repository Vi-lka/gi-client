import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ListLoading() {
    return (
        <ul className="flex flex-col gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <li key={index} className='flex items-center w-[80%] gap-2'>
                    <Skeleton className='w-9 h-9 rounded-full' />
                    <Skeleton className='w-full py-1 h-7'/>
                </li>
            ))}
        </ul>
    )
}

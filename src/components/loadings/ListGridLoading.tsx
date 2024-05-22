import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ListGridLoading() {
    return (
        <div className='w-full grid md:grid-cols-2 gap-8 lg:pt-28 pt-20'>
            {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className='w-full'>
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
            ))}
        </div>
    )
}

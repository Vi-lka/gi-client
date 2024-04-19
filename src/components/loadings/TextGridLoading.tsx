import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TextGridLoading() {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-6'/>

            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
                {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index}>
                        <Skeleton className='w-[50%] lg:h-8 h-7 mb-3'/>
                        <div className='lg:w-[90%] w-full flex flex-col gap-2'>
                            {Array.from({ length: 16 }).map((_, index) => (
                                <Skeleton key={index} className='w-full lg:h-5 h-4'/>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

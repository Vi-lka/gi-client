import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function TextImageLoading() {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-6'/>

            <div className='w-full lg:auto-rows-fr grid lg:grid-cols-2 grid-cols-1 gap-6'>
                <Skeleton className='w-full lg:h-full h-[45vw] lg:order-last'/>
                <div className='w-full flex flex-col gap-3'>
                    {Array.from({ length: 16 }).map((_, index) => (
                        <Skeleton key={index} className='w-full lg:h-6 h-5'/>
                    ))}
                </div>
            </div>
        </div>
    )
}

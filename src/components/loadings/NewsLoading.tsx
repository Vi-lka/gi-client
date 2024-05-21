import React from 'react'
import { Skeleton } from '../ui/skeleton'
import NewLoading from './items/NewLoading'

export default function NewsLoading() {
    return (
        <div className='w-full'>
            <Skeleton className='w-full h-12'/>

            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-fr lg:gap-8 gap-6 mt-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <NewLoading key={index} />
                ))}
            </div>
        </div>
    )
}

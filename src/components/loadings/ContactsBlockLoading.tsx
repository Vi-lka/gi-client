import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ContactsBlockLoading() {
    return (
        <div className='w-full flex gap-8 justify-between lg:pt-28 pt-20'>
            <div className='w-full flex flex-col justify-between flex-1'>
                <Skeleton className='w-full lg:h-10 h-9 mb-6'/>
                <div className='w-full max-w-80 flex flex-col gap-6'>
                    <Skeleton className='w-full lg:h-6 h-5'/>
                    <Skeleton className='w-full lg:h-6 h-5'/>
                    <Skeleton className='w-full lg:h-6 h-5'/>
                </div>
            </div>
            <Skeleton className='w-2/5 lg:block hidden aspect-video'/>
        </div>
    )
}

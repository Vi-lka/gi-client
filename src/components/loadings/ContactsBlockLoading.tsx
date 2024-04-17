import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function ContactsBlockLoading() {
    return (
        <div className='w-full flex gap-8 justify-between'>
            <div className='w-full flex flex-col justify-between flex-1'>
                <Skeleton className='w-full h-7 mb-6'/>
                <div className='w-full max-w-80 flex flex-col gap-6'>
                    <Skeleton className='w-full h-7'/>
                    <Skeleton className='w-full h-7'/>
                    <Skeleton className='w-full h-7'/>
                </div>
            </div>
            <Skeleton className='w-2/5 lg:block hidden aspect-video'/>
        </div>
    )
}

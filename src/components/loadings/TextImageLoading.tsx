import React from 'react'
import TextLoading from './TextLoading'
import { Skeleton } from '../ui/skeleton'

export default function TextImageLoading() {
    return (
        <div className='w-full auto-rows-fr grid lg:grid-cols-2 grid-cols-1 gap-6'>
            <Skeleton className='w-full h-full lg:order-last'/>
            <TextLoading />
        </div>
    )
}

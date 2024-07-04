import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { Loader2 } from 'lucide-react'

export default function CalendarBlocksLoading() {
    return (
        <div className='flex flex-wrap justify-between gap-6 md:mt-10'>
            <Skeleton className='min-h-[316px] flex items-center justify-center rounded-3xl xl:w-[calc(33%-1.5rem)] md:w-[calc(50%-1.5rem)] sm:w-full w-full'>
                <Loader2 className='animate-spin'/>
            </Skeleton>

            <Skeleton className='w-full min-h-[316px] flex items-center justify-center rounded-3xl xl:w-[calc(33%-1.5rem)] md:w-[calc(50%-1.5rem)]'>
                <Loader2 className='animate-spin'/>
            </Skeleton>

            <Skeleton className='w-full min-h-[316px] flex items-center justify-center rounded-3xl xl:w-[calc(33%-2.5rem)]'>
                <Loader2 className='animate-spin'/>
            </Skeleton>
        </div>
    )
}

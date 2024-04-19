import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

export default function IconsBlockLoading({
    isList,
    className
}: {
    isList?: boolean,
    className?: string
}) {
    return (
        <div className='w-full lg:pt-28 pt-20'>
            <Skeleton className='lg:w-1/2 w-2/3 lg:h-10 h-9 mb-8'/>

            <div className={cn(
                'grid gap-8',
                isList ? 'grid-cols-1' : 'lg:grid-cols-4 sm:grid-cols-2 grid-cols-1',
                className,
            )}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className='flex flex-col gap-2'>
                        <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 lg:mb-4 sm:mx-0 mx-auto rounded-full' />
                        <Skeleton className='w-full h-5' />
                        <Skeleton className='w-full h-20' />
                    </div>
                ))}
            </div>
        </div>
    )
}

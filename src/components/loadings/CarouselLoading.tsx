import { calcWidth, cn } from '@/lib/utils'
import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function CarouselLoading({
    className
}: {
    className?: string
}) {
    return (
        <div className={cn('w-full relative aspect-video', className)}>
            <div className='w-full h-full grid grid-cols-1 lg:gap-8 gap-4'>
                <Skeleton className='w-full h-full' />
            </div>
            <Skeleton className="absolute md:w-8 md:h-8 w-6 h-6 rounded-full md:-left-12 -left-7 top-1/2 -translate-y-1/2" />
            <Skeleton className="absolute md:w-8 md:h-8 w-6 h-6 rounded-full md:-right-12 -right-7 top-1/2 -translate-y-1/2"/>
            <div className="my-4 flex w-16 items-center justify-center gap-1 max-w-full mx-auto">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton 
                        key={index}
                        className="h-1.5 max-w-32 min-w-1"
                        style={{
                            width: calcWidth({index, current: 1, count: 3}) + "%"
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

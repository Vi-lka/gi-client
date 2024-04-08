import React from 'react'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/lib/utils'

export default function SliderLoading({
    className
}: {
    className?: string
}) {

    function calcWidth({index, current, count}: {index: number, current: number, count: number}) {
        const per = (100 / count) / count
        let perCount = 0

        if (index === (current - 1)) {
            Array.from({ length: count }).forEach((_, i) => {
                perCount = perCount + Math.abs(index - i)
            })

            return per * count + per * perCount
        } else {
            perCount = Math.abs((current - 1) - index)

            return per * count - per * perCount
        }
    }

    return (
        <div className={cn('w-full relative lg:aspect-video sm:aspect-[4/3] aspect-[5/6]', className)}>
            <div className='w-full h-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-8 gap-4'>
                <Skeleton className='w-full h-full' />
                <Skeleton className='w-full h-full lg:block hidden' />
                <Skeleton className='w-full h-full sm:block hidden' />
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

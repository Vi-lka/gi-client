import React from 'react'
import { BentoGrid, BentoGridItem } from '../ui/aceternity/bento-grid'
import { calcBento, cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'

export default function BentoLoading() {
    return (
        <BentoGrid>
            {Array.from({ length: 7 }).map((_, index) => {
                const isEach = calcBento(index, 7)

                return (
                    <BentoGridItem 
                        key={index}
                        header={<Skeleton className={cn('w-full min-h-24 rounded-2xl', isEach ? "aspect-[4/1]" : "aspect-[2/1]")}/>}
                        footer={
                            <div className='w-full flex-auto flex flex-col gap-6 justify-end'>
                                <div className='w-full flex mt-auto'>
                                    <Skeleton className='w-24 h-6 sm:ml-auto sm:mr-0 ml-auto mr-auto'/>
                                </div>
                            </div>
                        }
                        className={cn(isEach ? "lg:col-span-2" : "")}
                    >
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className='w-[calc(100%-1rem)] h-3 mb-1'/>
                        ))}
                    </BentoGridItem>
                )
            })}
        </BentoGrid>
    )
}

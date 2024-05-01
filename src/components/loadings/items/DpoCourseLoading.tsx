import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function DpoCourseLoading() {
    return (
        <Card className='min-w-0 h-full border-transparent dark:border-border/20 shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                <Skeleton className='lg:w-[45%] w-full lg:aspect-[4/5] aspect-[2/1] rounded-2xl'/>

                <div className='flex-1 lg:w-[55%] w-full flex flex-col gap-6 justify-between'>
                    <div>
                        <Skeleton className='w-full h-14'/>
                        <Skeleton className='w-full h-20 mt-3'/>
                    </div>

                    <ul className='flex flex-col gap-3 lg:mr-6'>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <Skeleton className='w-6 h-6'/>
                                <Skeleton className='w-full h-6 flex-1' />
                            </li>
                        ))}
                    </ul>

                    <div className='w-full flex justify-end'>
                        <Skeleton className='w-40 px-10 py-5 sm:ml-auto sm:mr-0 ml-auto mr-auto'/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

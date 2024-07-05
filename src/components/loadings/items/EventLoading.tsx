import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function EventLoading() {
    return (
        <Card className='min-w-0 h-full border-transparent dark:border-border/20 shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                <Skeleton className='md:w-[35%] w-full aspect-[2/1] rounded-2xl'/>

                <div className='flex-1 md:w-[65%] w-full flex flex-col gap-4 justify-between'>
                    <div className='w-full flex justify-between gap-3'>
                        <Skeleton className='w-full lg:h-14 h-9'/>
                        <Skeleton className='w-10 h-9 rounded-xl'/>
                    </div>

                    <ul className='flex flex-col lg:gap-3 gap-2 md:mr-6'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <Skeleton className='lg:w-5 w-4 lg:h-5 h-4'/>
                                <Skeleton className='w-full lg:h-5 h-4 flex-1' />
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

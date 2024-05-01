import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function DepartmentLoading() {
    return (
        <Card className='min-w-0 h-full border-transparent dark:border-border/20 shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                <Skeleton className='lg:w-[45%] w-full rounded-2xl lg:aspect-[5/3] aspect-[3/1]'/>
                <div className='flex-1 lg:w-[55%] w-full flex flex-col justify-between text-primary space-y-8'>
                    <Skeleton className='w-full h-[5.25rem]'/>

                    <ul className='flex flex-col gap-3 lg:flex-1 lg:mr-6'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <Skeleton className='w-5 h-5'/>
                                <Skeleton className='w-full h-5 flex-1' />
                            </li>
                        ))}
                    </ul>

                    <div className='w-full flex flex-col gap-6 justify-end'>
                        <div className='w-40 sm:ml-auto sm:mr-0 ml-auto mr-auto'>
                            <Skeleton className='px-10 py-5 w-full rounded-3xl'/>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
  )
}

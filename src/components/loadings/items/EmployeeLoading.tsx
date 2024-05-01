import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

export default function EmployeeLoading({ className }: { className?: string }) {
    return (
        <Card className={cn('h-full border-transparent dark:border-border/20 shadow-md rounded-3xl', className)}>
            <CardContent className="relative w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 xl:px-8 p-6 overflow-hidden">
                <Skeleton className='rounded-full aspect-square w-32 lg:mx-0 mx-auto'/>
      
                <div className='h-full flex flex-col flex-1 lg:justify-center gap-4'>
                    <div className='lg:mt-auto lg:pt-3'>
                        <Skeleton className='w-full h-8'/>
                        <Skeleton className='w-full h-4 mt-2'/>
                    </div>
                      
                    <Skeleton className='w-full h-16'/>

                    <ul className='flex flex-col gap-2'>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <li key={index} className='flex items-center gap-2'>
                                <Skeleton className='w-4 h-4'/>
                                <Skeleton className='w-full h-4 flex-1' />
                            </li>
                        ))}
                    </ul>

                    <ul className='inline-flex flex-wrap gap-2'>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <li key={index} className='w-[3.8rem]'>
                                <Skeleton className='w-full h-5' />
                            </li>
                        ))}
                    </ul>

                    <div className='w-full flex mt-auto'>
                        <Skeleton className='w-24 h-6 sm:ml-auto sm:mr-0 ml-auto mr-auto'/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

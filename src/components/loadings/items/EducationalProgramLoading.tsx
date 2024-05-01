import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function EducationalProgramLoading() {
    return (
        <Card className='min-w-0 shrink-0 grow-0 h-full border-transparent dark:border-border/20 shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                <Skeleton className='w-full rounded-2xl aspect-[2/1]'/>


                <div className='flex flex-col justify-between gap-3 xl:px-8 px-5'>
                    <div>
                        <Skeleton className='w-full h-6 mb-1'/>
                        <Skeleton className='w-full h-6'/>
                    </div>
                    <div>
                        <Skeleton className='w-full h-6 mb-1'/>
                        <Skeleton className='w-full h-6'/>
                    </div>
                </div>

                <Skeleton className='w-40 px-10 py-5 mx-auto mb-3 md:mt-auto'/>
            </CardContent>
        </Card>
    )
}

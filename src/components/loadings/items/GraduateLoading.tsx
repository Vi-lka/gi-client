import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'

export default function GraduateLoading({ className }: { className?: string }) {
    return (
        <Card className={cn('h-full border-transparent dark:border-border/20 shadow-md rounded-3xl', className)}>
            <CardContent className="relative w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 xl:px-8 p-6 overflow-hidden">
                <Skeleton className='rounded-full aspect-square w-32 lg:mx-0 mx-auto'/>
      
                <div className='flex flex-col flex-1 justify-between gap-6'>
                    <div>
                        <Skeleton className='w-full h-8 mb-2'/>
                        <Skeleton className='w-full h-6'/>
                    </div>
                    <Skeleton className='w-full h-12'/>
                </div>
            </CardContent>
        </Card>
    )
}

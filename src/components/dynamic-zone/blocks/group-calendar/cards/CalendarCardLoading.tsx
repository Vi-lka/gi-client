import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function CalendarCardLoading() {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='flex flex-col items-center justify-center text-center'>
        <Skeleton className='w-32 h-6 mb-1'/>
        <Skeleton className='w-20 h-5'/>
      </div>

      <div className='w-full flex flex-col gap-1.5'>
        <Skeleton className='w-full h-6'/>
        <Skeleton className='w-full h-24'/>
      </div>
    </div>
  )
}

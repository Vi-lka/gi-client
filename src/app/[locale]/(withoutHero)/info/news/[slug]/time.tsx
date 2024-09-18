"use client"

import { formatDate, reConvertUTCDateToLocalDate } from '@/lib/utils'
import { CalendarDays, Clock3 } from 'lucide-react'
import React from 'react'

export default function Time({
    publishedAt,
    locale,
}: {
    publishedAt: Date,
    locale: string,
}) {

  const time = reConvertUTCDateToLocalDate(publishedAt, false)

  const hours = time.getHours().toString().length >= 2 
    ? time.getHours().toString()
    : "0" + time.getHours().toString()

  const minutes = time.getMinutes().toString().length >= 2 
    ? time.getMinutes().toString()
    : "0" + time.getMinutes().toString()

  return (
    <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
            <CalendarDays className='w-auto h-5' />
            <p>{formatDate(time, locale)}</p>
        </div>
        <div className='flex items-center gap-1 dark:text-muted-foreground font-medium'>
            <Clock3 className='w-auto h-5' />
            <p>{hours + ":" + minutes}</p>
        </div>
    </div>
  )
}

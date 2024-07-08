import { cn, getValidChildren } from '@/lib/utils';
import { Circle } from 'lucide-react'
import React from 'react'
import "./timeline-horizontal.css"

export function Schedule({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  const countChildren = getValidChildren(children).length

  return (
    <div className={cn('pl-2.5 md:pl-0 md:pt-9 pt-1', className)} >
      <div className="timeline-horizontal">
        <ol 
          className="lg:text-base text-sm font-normal text-foreground" 
          style={{ gridTemplateColumns: `repeat(${countChildren}, minmax(0, 1fr))` }}
        >
          {children}
        </ol>
      </div>
    </div>
  )
}

export function ScheduleItem({
  title,
  time,
  className
}: {
  title: string,
  time?: string,
  className?: string
}) {
  return (
    <li className={cn("text-foreground", className)} >
      <span className="rounded-full bg-primary text-background">
        <Circle />
      </span>

      <span className='w-full break-words xl:text-sm md:text-xs sm:text-sm text-base'>{title}</span>

      {time && (
        <span className='text-base font-medium'>{time}</span>
      )}
    </li>
  )
}

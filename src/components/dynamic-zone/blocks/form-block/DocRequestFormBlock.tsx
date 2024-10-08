import RequestForm from '@/components/forms/RequestForm'
import { TypographyH2 } from '@/components/typography'
import type { DocRequestFormCompT } from '@/lib/types/components'
import { cn } from '@/lib/utils'
import React from 'react'

export default function DocRequestFormBlock({
  data,
  headingBig,
  className,
}: {
  data: DocRequestFormCompT,
  headingBig?: boolean,
  className?: string,
}) {
  return (
    <div className={cn("w-full", className)}>
      {data.title && (
        <TypographyH2 
          className={cn(
            'font-semibold text-primary mb-8 border-none',
            headingBig ? "text-4xl lg:text-5xl" : ""
          )}
        >
            {data.title}
        </TypographyH2>
      )}
    
      <div className="lg:w-2/5 w-full mx-auto">
        <RequestForm className='w-full' />
      </div>
    </div>
  )
}

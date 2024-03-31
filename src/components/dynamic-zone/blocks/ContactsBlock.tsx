import ImageComp from '@/components/ImageComp'
import { TypographyH2 } from '@/components/typography'
import type { ContactsCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'
import { PiAt, PiMapPin, PiPhoneCallLight } from "react-icons/pi";

export default function ContactsBlock({
  data,
  className,
}: {
  data: ContactsCompT,
  className?: string,
}) {
  return (
    <div className={cn("w-full flex gap-8 justify-between", className)}>
      <div className='flex flex-col gap-8 xl:justify-around justify-between flex-1'>
        {data.title && (
          <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
            {data.title}
          </TypographyH2>
        )}

        <ul className='flex flex-col gap-3'>
          <li className='flex items-center gap-3'>
            <PiPhoneCallLight className='w-6 h-6' />
            <p className='flex-1'>{data.phone}</p>
          </li>
          <li className='flex items-center gap-3 font-bold'>
            <PiAt className='w-6 h-6' />
            <p className='flex-1'>{data.email}</p>
          </li>
          <li className='flex items-center gap-3'>
            <PiMapPin className='w-6 h-6' />
            <p className='flex-1'>{data.location}</p>
          </li>
        </ul>
      </div>

      {data.image.data && (
        <div className='relative w-2/5 lg:block hidden aspect-video'>
          <ImageComp
            src={data.image.data.attributes.url}
            alt=""
            fill
            sizes='(max-width: 1024px) 100vw, 50vw'
            className='object-cover rounded-3xl overflow-hidden'
          />
        </div>
      )}
    </div>
  )
}

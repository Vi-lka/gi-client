import ImageComp from '@/components/ImageComp'
import { TypographyH2 } from '@/components/typography'
import type { ContactsCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { FiAtSign, FiMapPin, FiPhoneCall } from 'react-icons/fi'

export default function ContactsBlock({
  data,
  headingBig,
  className,
}: {
  data: ContactsCompT,
  headingBig?: boolean,
  className?: string,
}) {
  return (
    <div className={cn("w-full flex gap-8 justify-between", className)}>
      <div className='flex flex-col gap-8 xl:justify-around justify-between flex-1'>
        {data.title && (
          <TypographyH2 
            className={cn(
              'font-semibold text-primary mb-6 border-none',
              headingBig ? "text-4xl lg:text-5xl" : ""
            )}
          >
            {data.title}
          </TypographyH2>
        )}

        <ul className='flex flex-col gap-6'>
          {data.phone && (
            <li className='flex items-center gap-3'>
              <FiPhoneCall className='w-6 h-6' />
              <Link 
                href={`tel:${data.phone}`} 
                className='flex-1 hover:underline underline-offset-2'
              >
                {data.phone}
              </Link>
            </li>
          )}
          {data.email && (
            <li className='flex items-center gap-3'>
              <FiAtSign className='w-6 h-6' />
              <Link 
                href={`mailto:${data.email}`} 
                className='flex-1 hover:underline underline-offset-2'
              >
                {data.email}
              </Link>
            </li>
          )}
          {data.location && (
            <li className='flex items-center gap-3'>
              <FiMapPin className='w-6 h-6' />
              <Link 
                href={`https://maps.yandex.ru/?text=${data.location}`} 
                target='__blank'
                className='flex-1 hover:underline underline-offset-2'
              >
                {data.location}
              </Link>
            </li>
          )}
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

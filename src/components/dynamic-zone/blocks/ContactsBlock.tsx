import ImageComp from '@/components/ImageComp'
import { TypographyH2 } from '@/components/typography'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { AtSign, MapPin } from 'lucide-react'
import { FiPhone } from 'react-icons/fi'
import { ClientHydration } from '@/components/ClientHydration'
import { Skeleton } from '@/components/ui/skeleton'
import type { ContactsCompT } from '@/lib/types/components'
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi'

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
    <div className={cn(
      "w-full flex lg:flex-row flex-col justify-between",
      (data.alignContacts === "right") ? "lg:flex-row-reverse flex-col-reverse" : "",
      data.image.data ? "gap-8" : "gap-14",
      className
    )}>
      <div className='flex flex-col gap-8 flex-1'>
        {data.title && (
          <TypographyH2 
            className={cn(
              'font-semibold text-primary lg:mb-6 border-none',
              headingBig ? "text-4xl lg:text-5xl" : "", 
            )}
          >
            {data.title}
          </TypographyH2>
        )}

        <ul className='flex flex-col gap-6'>
          {data.phone && (
            <li className='flex items-center gap-3'>
              <FiPhone className='w-6 h-6' />
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
              <AtSign className='w-6 h-6' />
              <Link 
                href={`mailto:${data.email}`} 
                className='flex-1 hover:underline underline-offset-2 truncate'
              >
                {data.email}
              </Link>
            </li>
          )}
          {data.location && (
            <li className='flex items-center gap-3'>
              <MapPin className='w-6 h-6' />
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

      <div className={cn(
        'flex flex-col gap-8',
        data.image.data ? "w-2/5" : "flex-1"
      )}>
        {data.secondTitle && (
          <TypographyH2 
            className={cn(
              'font-semibold text-primary border-none lg:mb-6',
              headingBig ? "text-4xl lg:text-5xl" : "",
              data.image.data ? "hidden" : ""
            )}
          >
            {data.secondTitle}
          </TypographyH2>
        )}

        {(!data.image.data && data.additionalText) && (
          <article className="prose prose-p:!my-0 prose-p:text-sm dark:text-muted-foreground prose-headings:text-foreground">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <BlocksRendererStrapi content={data.additionalText} />
          </article>
        )}

        {data.image.data && (
          <div className='relative w-full lg:block hidden aspect-video'>
            <ClientHydration fallback={<Skeleton className='w-full h-full'/>}>
              <ImageComp
                src={data.image.data.attributes.url}
                alt=""
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover rounded-3xl overflow-hidden'
              />
            </ClientHydration>
          </div>
        )}
      </div>
    </div>
  )
}

import React from 'react'
import type { EventSingleT } from '@/lib/types/entities'
import { Card, CardContent } from '@/components/ui/card'
import { ClientHydration } from '@/components/ClientHydration'
import { Skeleton } from '@/components/ui/skeleton'
import Link from '@/components/Link'
import ImageComp from '@/components/ImageComp'
import { formatDate, getShortText } from '@/lib/utils'
import { IoCalendarOutline } from 'react-icons/io5'
import { CalendarPlus, Globe, MapPin } from 'lucide-react'
import NextLink from "next/link"
import { Button } from '@/components/ui/button'
import CredenzaPopup from '@/components/CredenzaPopup'
import AddToCalendar from '../entities/events/segments/carousel-segment/AddToCalendar'

export default function EventsItem({
  locale,
  item, 
  dict
}: {
  locale: string
  item: EventSingleT,
  dict: Dictionary,
}) {
  return (
    <Card key={"event" + item.id} className='min-w-0 h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
      <CardContent className="w-full h-full flex md:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
        <ClientHydration fallback={<Skeleton className='md:w-[35%] w-full aspect-[2/1] rounded-2xl'/>}>
          <Link 
            locale={locale} 
            href={`/info/events/${item.attributes.slug}`} 
            className='relative md:w-[35%] w-full aspect-[2/1] rounded-2xl overflow-hidden'
          >
            <ImageComp
              src={item.attributes.image.data?.attributes.url}
              alt={item.attributes.title}
              fill
              sizes='(max-width: 1024px) 80vw, 30vw'
              className='object-cover'
            />
          </Link>
        </ClientHydration>

        <div className='relative flex-1 md:w-[65%] w-full flex flex-col gap-4 justify-between text-primary'>
          <div className='w-full flex justify-between gap-3'>
            <Link locale={locale} href={`/info/events/${item.attributes.slug}`} className='w-fit'>
              <h4 className='xl:text-xl lg:text-lg md:text-base sm:text-xl text-lg font-bold line-clamp-2 md:translate-y-1 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                {getShortText(item.attributes.title, 20)}
              </h4>
            </Link>
            <ClientHydration fallback={<Skeleton className='w-9 h-9 rounded-xl'/>}>
              <CredenzaPopup
                trigger={
                  <Button
                    variant="secondary"
                    className='px-2 bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground hover:text-primary transition-all duration-200 rounded-xl'
                  >
                    <CalendarPlus className='w-5 h-5' />
                  </Button>
                }
                title={dict.Calendar.select}
                description={dict.Calendar.selectDescription}
              >
                <AddToCalendar 
                  type="credenza"
                  date={item.attributes.dateStart}
                  eventId={item.id}
                  itemData={undefined}
                  className='md:mb-1 mb-6'
                />
              </CredenzaPopup>
            </ClientHydration>
          </div>

          <ul className='flex flex-col lg:gap-3 gap-2 md:mr-6 text-primary'>
            <li className='flex items-center gap-2 lg:text-base text-sm'>
              <IoCalendarOutline className='w-auto lg:h-5 h-4' />
              <p className='flex-1'>
                {item.attributes.dateStart && formatDate(item.attributes.dateStart, locale)}
                {item.attributes.dateEnd && " - "}
                {item.attributes.dateEnd && formatDate(item.attributes.dateEnd, locale)}
              </p>
            </li>

            <li className='flex items-center gap-2 text-base'>
              <MapPin className='w-auto lg:h-5 h-4' />
              <NextLink 
                href={`https://maps.yandex.ru/?text=${item.attributes.location}`}
                target='__blank'
                className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all transform-gpu duration-300'
              >
                {item.attributes.location}
              </NextLink>
            </li>

            {item.attributes.online && (
              <li className='flex items-center gap-2 text-base'>
                <Globe className='w-auto lg:h-5 h-4' />
                <NextLink 
                  href={item.attributes.online}
                  target='__blank'
                  className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all transform-gpu duration-300'
                >
                  {new URL(item.attributes.online).hostname}
                </NextLink>
              </li>
            )}
          </ul>

          <div className='w-full flex flex-col gap-6 justify-end'>
            <Link locale={locale} href={`/info/events/${item.attributes.slug}`} className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
              <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                {dict.Buttons.more}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card> 
  )
}

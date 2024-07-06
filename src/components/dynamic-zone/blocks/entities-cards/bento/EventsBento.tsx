import { ClientHydration } from '@/components/ClientHydration'
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid'
import { Skeleton } from '@/components/ui/skeleton'
import type { EventSingleT, EventsT } from '@/lib/types/entities'
import { calcBento, cn, formatDate, getShortText } from '@/lib/utils'
import React from 'react'
import BentoImage from './BentoImage'
import MoreButton from '@/components/MoreButton'
import { CalendarPlus, ChevronRight, Globe, MapPin } from 'lucide-react'
import Link from '@/components/Link'
import NextLink from "next/link"
import { IoCalendarOutline } from 'react-icons/io5'
import CredenzaPopup from '@/components/CredenzaPopup'
import { Button } from '@/components/ui/button'
import AddToCalendar from '../../entities/events/segments/carousel-segment/AddToCalendar'

export default function EventsBento({
  locale,
  events,
  dict
}: {
  locale: string,
  events: EventsT,
  dict: Dictionary
})  {
  return (
    <BentoGrid>
      {events.data.map((item, i) => {
        const isEach = calcBento(i, events.data.length)
        const hasImage = Boolean(item.attributes.image.data?.attributes.url)

        return (
          <BentoGridItem
            key={"events-bento-" + item.id}
            header={
              hasImage ? (
                <ClientHydration fallback={
                  <Skeleton className={cn(
                    'w-full min-h-24 rounded-2xl', 
                    isEach ? "aspect-[4/1]" : "aspect-[2/1]",
                    events.meta.pagination.total === 1 ? "aspect-[4/1]" : "",
                  )}/>
                }>
                  <BentoImage 
                    href={`/info/events/${item.attributes.slug}`} 
                    src={item.attributes.image.data?.attributes.url}
                    alt={item.attributes.title}
                    sizes={
                      events.meta.pagination.total === 1 
                      ? "100vw"
                      : isEach 
                        ? "(max-width: 1024px) 100vw, 70vw" 
                        : "(max-width: 1024px) 100vw, 40vw"
                    }
                    className={cn(
                      isEach ? "aspect-[4/1]" : "aspect-[2/1]",
                      events.meta.pagination.total === 1 ? "aspect-[4/1]" : "",
                    )}
                  />
                </ClientHydration>
              )
              : null
            }
            footer={
              <div className='w-full flex-auto flex flex-col gap-6 justify-end'>
                <MoreButton 
                  href={`/info/events/${item.attributes.slug}`}
                  variant="link"
                  className='h-6 p-0 text-xs'
                >
                  <ChevronRight size={20} />
                </MoreButton>
              </div>
            }
            className={cn(
                isEach ? "lg:col-span-2" : "",
                events.meta.pagination.total === 1 ? "lg:col-span-3" : "",
                hasImage ? "p-4" : "p-8"
            )}
          >
            <div className='w-full flex justify-between gap-3'>
              <Link locale={locale} href={`/info/events/${item.attributes.slug}`} className='w-fit'>
                <h4 className='font-bold md:text-lg text-base mr-4 lg:line-clamp-3 line-clamp-5'>
                  {getShortText(item.attributes.title, 20)}
                </h4>
              </Link>
              <CredenzaPopup
                trigger={
                  <Button
                    variant="secondary"
                    className='px-2 bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground hover:text-primary rounded-xl group-hover/bento:-translate-x-2 transition-all duration-300 transform-gpu'
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
            </div>
            <Description locale={locale} item={item} hasImage={hasImage} />
          </BentoGridItem>
        )
      })}
    </BentoGrid>
  )
}

function Description({ 
  locale,
  item,
  hasImage,
}: { 
  locale: string,
  item: EventSingleT,
  hasImage: boolean
}) {
  return (
    <ul className={cn(
      'flex mr-4',
      hasImage 
      ? "flex-wrap gap-x-3 gap-y-2 text-sm text-muted-foreground mt-2" 
      : "flex-col gap-4 text-sm mt-8"
    )}>
      <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
          <IoCalendarOutline className={cn('w-auto', hasImage ? 'h-4' : 'h-5' )} />
          <p className='flex-1'>
            {formatDate(item.attributes.dateStart, locale)}
            {item.attributes.dateEnd ? " - " + formatDate(item.attributes.dateEnd, locale) : ""}
          </p>
      </li>

      <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
        <MapPin className={cn('w-auto', hasImage ? 'h-4' : 'h-5' )} />
        <DescriptionItem 
          title={item.attributes.location}
          targetBlank
          href={`https://maps.yandex.ru/?text=${item.attributes.location}`}
        />
      </li>

      {item.attributes.online && (
        <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
          <Globe className={cn('w-auto', hasImage ? 'h-4' : 'h-5' )} />
          <DescriptionItem 
            title={new URL(item.attributes.online).hostname}
            targetBlank
            href={item.attributes.online}
          />
        </li>
      )}
    </ul>
  )
}

type DescriptionItemT = {
  title: string,
  href: string,
} & (TargetBlank | NotTargetBlank);

type TargetBlank = {
  targetBlank: true;
};
type NotTargetBlank = {
  targetBlank?: false;
  locale: string;
};
function DescriptionItem(props: DescriptionItemT) {

  if (props.targetBlank) return (
    <NextLink 
      href={props.href}
      target='__blank'
      className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
    >
      {props.title}
    </NextLink>
  )

  return (
    <Link 
      locale={props.locale}
      href={props.href}
      className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
    >
      {props.title}
    </Link>
  )
}

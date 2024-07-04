"use client"

import BlocksRendererStrapi from '@/components/BlocksRendererStrapi';
import MoreButton from '@/components/MoreButton';
import { TypographyH4 } from '@/components/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { eventIdAtom } from '@/lib/hooks/atoms';
import { useLocale } from '@/lib/hooks/useLocale';
import { cn, formatDate } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { ChevronRight, Loader2, MapPin } from 'lucide-react';
import React from 'react'
import { IoCalendarOutline } from "react-icons/io5";

export default function TextSegment({
  datesByEventId,
  className
}: {
  datesByEventId: {
    id: string;
    eventData: {
      slug: string;
      title: string;
      location: string;
      dateStart: Date;
      dateEnd: Date | null;
      text: unknown;
    };
    dates: Date[];
  }[],
  className?: string
}) {

  const locale = useLocale()

  const eventId = useAtomValue(eventIdAtom)

  const data = datesByEventId.find(item => item.id === eventId)

  if (!data) return (
    <div key={eventId} className={cn('w-full h-full relative', className)}>
      <Skeleton className='h-full w-full min-h-[316px] flex items-center justify-center rounded-3xl'>
        <Loader2 className='animate-spin'/>
      </Skeleton>
    </div>
  )
  
  return (
    <div key={eventId} className={cn('w-full relative', className)}>
      <TypographyH4 className='xl:text-lg text-base mb-2 animate-fade-left animate-duration-500 animate-ease-out'>
        {data.eventData.title}
      </TypographyH4>

      <p className='xl:text-sm text-xs flex gap-1 items-center mb-1 animate-fade-left animate-duration-500 animate-ease-out animate-delay-75'>
        <IoCalendarOutline size={16} />
        <span className='flex-1'>
          {formatDate(data.eventData.dateStart, locale)}
          {data.eventData.dateEnd ? " - " + formatDate(data.eventData.dateEnd, locale) : ""}
        </span>
      </p>
      <p className='xl:text-sm text-xs flex gap-1 items-center animate-fade-left animate-duration-500 animate-ease-out animate-delay-75'>
        <MapPin size={16} />
        <span className='flex-1'>
          {data.eventData.location}
        </span>
      </p>

      <article className={cn(
        "mt-2 prose prose-sm max-w-none prose-p:!my-0 prose-p:text-sm text-foreground dark:text-muted-foreground prose-headings:text-foreground",
        "line-clamp-[11] max-h-56 overflow-hidden",
        "animate-fade-left animate-duration-500 animate-ease-out animate-delay-150"
      )}>
        <BlocksRendererStrapi content={data.eventData.text} />
      </article>

      <div className='xl:absolute -bottom-6 xl:mt-0 mt-1 w-full flex-auto flex flex-col gap-6 justify-end'>
        <MoreButton 
          href={`/info/events/${data.eventData.slug}`}
          variant="link"
          className='h-6 p-0 text-xs'
        >
          <ChevronRight size={20} />
        </MoreButton>
      </div>
    </div>
  )
}

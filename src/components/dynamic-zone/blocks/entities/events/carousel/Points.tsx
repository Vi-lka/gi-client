import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocale } from '@/lib/hooks/useLocale';
import type { EventDayT, EventSingleT } from '@/lib/types/entities';
import { cn, formatDate } from '@/lib/utils';
import { CalendarPlus } from 'lucide-react';
import React, { createRef } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import AddToCalendar from './AddToCalendar';
import type { CalendarEvent } from "calendar-link";
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';
import ErrorToast from '@/components/errors/ErrorToast';
import CredenzaPopup from '@/components/CredenzaPopup';

type EventInfo = {
  event: {
    data: EventSingleT
  }
}

export default function Points({
  date,
  eventId,
  itemData,
  setActive
}: {
  date: Date;
  eventId: string | undefined;
  itemData: EventDayT | undefined;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const locale = useLocale()

  const scrollRef = createRef<HTMLDivElement>();

  const handleActive = (active: boolean) => {
    if (scrollRef.current && (scrollRef.current.scrollHeight <= scrollRef.current.clientHeight)) {
      setActive(true)
    } else {
      setActive(active)
    }
  }

  const { data, error, isLoading } = useSWR<EventInfo, Error>(
    `query EventById {
      event(locale: "${locale}", id: "${eventId}") {
        data {
          id
          attributes {
            title
            slug
            image {
              data {
                attributes { url }
              }
            }
            location online
            text
            dateStart dateEnd
            days(sort: "date:asc") {
              title
              date
              points(sort: "time:asc") {
                time
                description
                text
              }
            }
          }
        }
      }
    }`
  );
  if (isLoading) return <Skeleton className='rounded-lg border-border shadow h-10 w-full'/>
  if (error) return <ErrorToast error={error.message} place="Мероприятия" returnNull />;
  if (!data || !data.event.data) return null;

  const eventData = data.event.data.attributes

  // *** EVENT
  const eventUrl =  `Ссылка на мероприятие: ${process.env.NEXT_PUBLIC_URL}/info/${eventData.slug}\n\n\n\n`

  const eventOnline = eventData.online ? `Ссылка на подключение: ${eventData.online}\n\n\n\n` : ""

  const eventShedule = eventData.days.map(day => {
    const titleText = day.title 
      ? `${formatDate(day.date, locale)}: ${day.title}\n\n`
      : `${formatDate(day.date, locale)}\n\n`
    
    const pointsText = day.points.map(point => 
      `${point.time.slice(0, 5)}: ${point.description}`
    ).join('\n')

    return titleText + pointsText
  }).join('\n\n\n')

  const event: CalendarEvent = {
    title: eventData.title,
    description: eventUrl + eventOnline + eventShedule,
    start: eventData.dateStart,
    end: eventData.dateEnd,
    location: eventData.location,
    url: eventUrl,
  };
  // *** EVENT


  // *** ONE DAY
  const dayTitle = itemData?.title 
    ? `${eventData.title} (${formatDate(date, locale)}): ${itemData.title}` 
    : `${eventData.title} (${formatDate(date, locale)})`

  const dayDescription = (itemData && itemData.points.length > 0)
    ? itemData.points.map(point => 
      `${point.time.slice(0, 5)}: ${point.description}`
    ).join('\n\n')
    : ''


  let dayStart = new Date(date)
  if (itemData && itemData.points.length > 0) {
    dayStart.setHours(
      Number(itemData.points[0].time.slice(0, 2)), // hours
      Number(itemData.points[0].time.slice(3, 5)) // min
    )
  }

  let dayEnd = new Date(dayStart)
  if (itemData && itemData.points.length > 1) {
    dayEnd.setHours(
      Number(itemData.points[itemData.points.length - 1].time.slice(0, 2)), // hours
      Number(itemData.points[itemData.points.length - 1].time.slice(3, 5)) // min
    )
  }

  const day: CalendarEvent = {
    title: dayTitle,
    description: dayDescription,
    start: dayStart,
    end: dayEnd,
    location: eventData.location,
    url: eventUrl,
  };
  // *** ONE DAY

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex w-full justify-between gap-6'>
        <div className='flex items-center gap-2 relative'>
          <IoCalendarOutline className='w-9 h-9 p-[7px] z-10 text-primary' />
          <div className='absolute w-9 h-9 bg-apricot rounded-full z-0'/>
          <p className='text-lg font-semibold'>
            {formatDate(date, locale)}
          </p>
        </div>
        <CredenzaPopup
          trigger={
            <Button
              variant="secondary"
              className='px-2 bg-apricot text-primary transition-all duration-200 rounded-xl'
            >
              <CalendarPlus className='w-5 h-5' />
            </Button>
          }
          title='Выберите календарь'
          description='Это действие создаст запись о мероприятии/дне в вашем календаре.'
        >
          <AddToCalendar 
            type="credenza"
            event={event}
            day={day}
            date={date}
            className='md:mb-1 mb-6'
          />
        </CredenzaPopup>
      </div>

      <div className='mt-2 flex-1 flex flex-col'>
        {itemData
          ? (
            <>
              {itemData.title && (<span className='mb-1 font-semibold text-base'>{itemData.title}</span>)}
              <ScrollArea 
                refViewport={scrollRef}
                type="auto" 
                className='flex-1 z-50'
                classNameViewport={cn( 'z-50 border-t px-1 pt-2', itemData.title ? 'h-[162px]' : 'h-[190px]')} 
                classNameBar='bg-muted/20 py-[3px] pr-[2px] rounded-full h-[calc(100%-0.5rem)] !top-auto !bottom-0'
                onPointerEnter={() => handleActive(false)}
                onPointerLeave={() => handleActive(true)}
                onTouchStart={() => handleActive(false)}
                onTouchEnd={() => handleActive(true)}
              >
                {itemData.points.map((point, indx) => (
                  <div key={indx} className='text-base mb-1.5 last:mb-0'>
                    <p className='font-semibold'>
                      {point.time.slice(0, 5)}
                    </p>
                    <p className='text-sm'>{point.description}</p>
                  </div>
                ))}
              </ScrollArea>
            </>
          )
          : (
            <div className='w-full h-[190px] flex items-center justify-center'>
              <span className='mb-3 font-semibold text-base text-center'>
                Расписание отсутствует
              </span>
            </div>
          )
        }
      </div>
    </div>
  )
}

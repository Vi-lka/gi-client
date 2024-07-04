"use client"

import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import type { CalendarEvent } from "calendar-link";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { CredenzaProps } from '@/components/ui/credenza';
import { CredenzaClose } from '@/components/ui/credenza';
import type { DialogCloseProps } from '@radix-ui/react-dialog';
import { DialogClose } from '@/components/ui/dialog';
import { DrawerClose } from '@/components/ui/drawer';
import { FaApple, FaGoogle, FaYahoo, FaYandex } from 'react-icons/fa';
import { SiMicrosoftoutlook } from 'react-icons/si';
import { TbBrandOffice } from 'react-icons/tb';
import { cn, formatDate } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocale } from '@/lib/hooks/useLocale';
import { motion } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import useSWR from 'swr';
import type { EventDayT, EventSingleT } from '@/lib/types/entities';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import ErrorToast from '@/components/errors/ErrorToast';

type EventInfo = {
  event: {
    data: EventSingleT
  }
}

export default function AddToCalendar({
  type,
  date,
  eventId,
  itemData,
  className
}: {
  type: "credenza" | "dialog" | "drawer",
  date: Date,
  eventId: string | undefined;
  itemData: EventDayT | undefined;
  className?: string,
}) {
  const locale = useLocale()

  const dict = useDictionary()

  const [selectedTab, setSelectedTab] = useState("event");

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
  if (isLoading) return (
    <Skeleton className={cn('xl:h-[440px] h-[356px] w-full flex items-center justify-center rounded-2xl', className)}>
      <Loader2 className='animate-spin'/>
    </Skeleton>
  )
  if (error) return <ErrorToast error={error.message} place="Events Add to Calendar" returnNull />;
  if (!data || !data.event.data) return null;

  const eventData = data.event.data.attributes

  // *** EVENT
  const eventUrl =  `${dict.Calendar.eventUrl}: ${process.env.NEXT_PUBLIC_URL}/info/events/${eventData.slug}\n\n\n\n`

  const eventOnline = eventData.online ? `${dict.Calendar.eventOnline}: ${eventData.online}\n\n\n\n` : ""

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

  const dayShedule = (itemData && itemData.points.length > 0)
    ? itemData.points.map(point => 
      `${point.time.slice(0, 5)}: ${point.description}`
    ).join('\n\n')
    : ''

  const dayStart = new Date(date)
  if (itemData && itemData.points.length > 0) {
    dayStart.setHours(
      Number(itemData.points[0].time.slice(0, 2)), // hours
      Number(itemData.points[0].time.slice(3, 5)) // min
    )
  }

  const dayEnd = new Date(dayStart)
  if (itemData && itemData.points.length > 1) {
    dayEnd.setHours(
      Number(itemData.points[itemData.points.length - 1].time.slice(0, 2)), // hours
      Number(itemData.points[itemData.points.length - 1].time.slice(3, 5)) // min
    )
  }

  const day: CalendarEvent = {
    title: dayTitle,
    description: eventUrl + eventOnline + dayShedule,
    start: dayStart,
    end: dayEnd,
    location: eventData.location,
    url: eventUrl,
  };
  // *** ONE DAY

  const eventGoogleUrl = google(event); // https://calendar.google.com/calendar/render...
  const eventICSUrl = ics(event); // standard ICS file based on https://icalendar.org
  const eventOutlookUrl = outlook(event); // https://outlook.live.com/owa/...
  const eventOffice365Url = office365(event); // https://outlook.office.com/owa/...
  const eventYahooUrl = yahoo(event); // https://calendar.yahoo.com/?v=60&title=...

  const dayGoogleUrl = google(day); // https://calendar.google.com/calendar/render...
  const dayICSUrl = ics(day); // standard ICS file based on https://icalendar.org
  const dayOutlookUrl = outlook(day); // https://outlook.live.com/owa/...
  const dayOffice365Url = office365(day); // https://outlook.office.com/owa/...
  const dayYahooUrl = yahoo(day); // https://calendar.yahoo.com/?v=60&title=...

  const items = [
    {id: "event", title: dict.Calendar.wholeEvent}, 
    {id: "day", title: `${dict.Calendar.day}: ${formatDate(date, locale)}`}
  ]

  return (
    <Tabs 
      value={selectedTab} 
      defaultValue="event" 
      className={cn("w-full", className)}
    >
      <TabsList className="w-full flex-wrap sm:justify-around justify-center gap-y-1 bg-primary/10 h-fit py-1 mb-3" >
        {items.map(item => (
          <TabsTrigger 
            key={item.id} 
            value={item.id}
            onClick={() => setSelectedTab(item.id)}
            className="relative w-1/2 inline-flex py-1 px-2 rounded-md text-base text-primary/80 hover:text-primary data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all duration-200"
          >
            {selectedTab === item.id && (
              <motion.span
                layoutId={`bubble-calendar`}
                className="absolute inset-0 z-[-1] bg-primary shadow rounded-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="event">
        <ul className='flex flex-col gap-4 items-center justify-center my-1'>
          <AddToCalendarItem type={type} href={eventGoogleUrl}>
            <FaGoogle className='mr-2'/> Google Calendar
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={eventICSUrl}>
            <FaApple className='mr-2'/> Apple<span className='text-xs ml-1'>(ics {dict.Calendar.file})</span>
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={eventICSUrl}>
            <FaYandex className='mr-2'/> {dict.Calendar.Yandex}<span className='text-xs ml-1'>(ics {dict.Calendar.file})</span>
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={eventOutlookUrl}>
            <SiMicrosoftoutlook className='mr-2'/> Outlook
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={eventOffice365Url}>
            <TbBrandOffice className='mr-2'/> Office365
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={eventYahooUrl}>
            <FaYahoo className='mr-2' /> Yahoo
          </AddToCalendarItem>
        </ul>
      </TabsContent>
      <TabsContent value="day">
        <ul className='flex flex-col gap-4 items-center justify-center my-1'>
          <AddToCalendarItem type={type} href={dayGoogleUrl}>
            <FaGoogle className='mr-2'/> Google Calendar
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={dayICSUrl}>
            <FaApple className='mr-2'/> Apple<span className='text-xs ml-1'>(ics {dict.Calendar.file})</span>
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={dayICSUrl}>
            <FaYandex className='mr-2'/> {dict.Calendar.Yandex}<span className='text-xs ml-1'>(ics {dict.Calendar.file})</span>
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={dayOutlookUrl}>
            <SiMicrosoftoutlook className='mr-2'/> Outlook
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={dayOffice365Url}>
            <TbBrandOffice className='mr-2'/> Office365
          </AddToCalendarItem>

          <AddToCalendarItem type={type} href={dayYahooUrl}>
            <FaYahoo className='mr-2' /> Yahoo
          </AddToCalendarItem>
        </ul>
      </TabsContent>
    </Tabs>
  )
}


function AddToCalendarItem({
  href,
  type,
  children,
}: {
  href: string,
  type: "credenza" | "dialog" | "drawer",
  children: ReactNode,
}) {

  let CloseButton: 
    (({ className, children, ...props }: CredenzaProps) => React.JSX.Element) 
    | 
    React.ForwardRefExoticComponent<DialogCloseProps & React.RefAttributes<HTMLButtonElement>>

  switch (type) {
    case "credenza":
      CloseButton = CredenzaClose;
    case "dialog":
      CloseButton = DialogClose;
    case "drawer":
      CloseButton = DrawerClose;

    default:
      CloseButton = DialogClose;
  }

  return (
    <CloseButton asChild>
      <Link href={href} target="_blank" passHref className='w-full'>
        <li>
          <Button variant="outline" className='flex items-center w-full font-medium shadow text-base xl:p-6 p-4'>
            {children}
          </Button>
        </li>
      </Link>
    </CloseButton>
  )
}

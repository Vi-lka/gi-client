import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocale } from '@/lib/hooks/useLocale';
import type { EventDayT } from '@/lib/types/entities';
import { cn, formatDate } from '@/lib/utils';
import { CalendarPlus } from 'lucide-react';
import React, { createRef } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import AddToCalendar from './AddToCalendar';
import type { CalendarEvent } from "calendar-link";

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

  const event: CalendarEvent = {
    title: "Всероссийский Aрхеологический Cъезд",
    description: `Вы можете ознакомиться со всей информацией и состоянием вашего доклада на сайте: ${process.env.NEXT_PUBLIC_URL}`,
    start: "2025-10-6 0:00:00 +0700",
    end: "2025-10-10 0:00:00 +0700",
    location: "г. Красноярск, пр. Свободный, 82"
  };

  const day: CalendarEvent = {
    title: "Всероссийский Aрхеологический Cъезд",
    description: `Вы можете ознакомиться со всей информацией и состоянием вашего доклада на сайте: ${process.env.NEXT_PUBLIC_URL}`,
    start: "2025-10-6 0:00:00 +0700",
    end: "2025-10-10 0:00:00 +0700",
    location: "г. Красноярск, пр. Свободный, 82"
  };

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

        <Credenza noBodyStyles>
          <CredenzaTrigger asChild>
            <Button
              variant="secondary"
              className='px-2 bg-apricot text-primary transition-all duration-200 rounded-xl'
            >
              <CalendarPlus className='w-5 h-5' />
            </Button>
          </CredenzaTrigger>
          <CredenzaContent className='sm:rounded-3xl rounded-3xl md:p-8'>
            <CredenzaHeader className='mb-1'>
              <CredenzaTitle>Выберите календарь</CredenzaTitle>
              <CredenzaDescription className='whitespace-pre-wrap'>
                Это действие создаст запись о мероприятии в вашем календаре.
              </CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
              <AddToCalendar 
                type="credenza"
                event={event}
                day={day}
                date={date}
                className='md:mb-1 mb-6'
              />
            </CredenzaBody>
          </CredenzaContent>
        </Credenza>
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

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLocale } from '@/lib/hooks/useLocale';
import type { EventDayT } from '@/lib/types/entities';
import { formatDate } from '@/lib/utils';
import { CalendarPlus } from 'lucide-react';
import React from 'react'
import { IoCalendarOutline } from "react-icons/io5";

export default function Points({
  date,
  eventId,
  itemData
}: {
  date: Date,
  eventId: string;
  itemData: EventDayT | undefined;
}) {

  const locale = useLocale()

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
        <Button variant="secondary" className='px-2 bg-apricot text-primary transition-all duration-200 rounded-xl'>
          <CalendarPlus className='w-5 h-5' />
        </Button>
      </div>
      <div className='mt-3 ml-11 flex-1 flex flex-col'>
        {itemData 
          ? (
            <>
              {itemData.title}
              <ScrollArea 
                type="auto" 
                className='flex-1 mt-1 z-50'
                classNameViewport='h-[138px] z-50' 
                classNameBar='bg-muted/20 py-[3px] pr-[2px] rounded-full'
              >
                {itemData.points.map((point, indx) => (
                  <p key={indx} className='mb-8'>{point.time.slice(0, 5)}</p>
                ))}
              </ScrollArea>
            </>
          )
          : (
            "No Data"
          )
        }
      </div>
    </div>
  )
}

"use client"

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import type { CarouselApi } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import CarouselItemMulti from './carousel-segment/CarouselItemMulti'
import CarouselItemSingle from './carousel-segment/CarouselItemSingle'
import getItemData from '../getItemData'
import type { EventDayT } from '@/lib/types/entities'
import { useAtomValue, useSetAtom } from 'jotai'
import { activeCarouselAtom, dateAtom, monthAtom } from '@/lib/hooks/atoms'

type Props = {
  data: {
    dates: Date[],
    duplicates: Date[],
    eventsDays: {
      eventId: string;
      days: EventDayT[]
    }[],
    datesByEventId: {
      id: string;
      eventData: {
        slug: string;
        title: string;
        location: string;
        online: string | null;
        dateStart: Date;
        dateEnd: Date | null;
        text: unknown;
      };
      dates: Date[];
    }[]
  },
  api: CarouselApi,
  setApi: React.Dispatch<React.SetStateAction<CarouselApi>>,
  className?: string,
}

export default function CarouselSegment({
  data,
  api,
  setApi,
  className,
}: Props) {

  const setDate = useSetAtom(dateAtom)
  const setMonth = useSetAtom(monthAtom)
  const active = useAtomValue(activeCarouselAtom)
 
  React.useEffect(() => {
    if (!api) return
 
    api.on("select", () => {
      setDate(data.dates[api.selectedScrollSnap()])
      setMonth(data.dates[api.selectedScrollSnap()])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
      <Carousel
        setApi={setApi}
        opts={{ 
          align: "center", 
          axis: "y",
          watchDrag: active,
          // startIndex: indx,
        }}
        plugins={[
          WheelGesturesPlugin({active})
        ]}
        orientation="vertical"
        className={cn("w-full max-w-lg md:mt-0 mt-6", className)}
      >
        <CarouselContent className="-mt-8 h-[300px]" classNameOverflow='py-6 px-2'>
          {data.dates.map((dateItem, index) => {
            const { duplicateIndx, items } = getItemData({
              currentDate: dateItem,
              duplicates: data.duplicates,
              datesByEventId: data.datesByEventId,
              eventsDays: data.eventsDays
            })
            // If duplicates
            if ((duplicateIndx >= 0) && (items.length > 1)) return (
              <CarouselItemMulti 
                key={index} 
                date={dateItem} 
                items={items} 
              />
            )
            else return (
                <CarouselItemSingle 
                  key={index} 
                  date={dateItem} 
                  data={items[0]} 
                />
              )
          })}
        </CarouselContent>
        <CarouselPrevious className='disabled:opacity-20 md:-top-8 -top-6 border-none shadow-none transition-all duration-200' />
        <CarouselNext className='disabled:opacity-20 md:-bottom-8 -bottom-6 border-none shadow-none transition-all duration-200' />
      </Carousel>
  )
}


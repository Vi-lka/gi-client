"use client"

import { Carousel } from '@/components/ui/carousel'
import type { EventDayT } from '@/lib/types/entities'
import React from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import type { CarouselApi } from '@/components/ui/carousel'
import { cn, getDateIndx } from '@/lib/utils'
import CarouselContent from './CarouselContent'


export default function CarouselSegment({
  data,
  api,
  setApi,
  setDate,
  setMonth,
  className,
}: {
  data: {
    dates: Date[],
    duplicates: Date[],
    eventsDays: {
      eventId: string;
      days: EventDayT[]
    }[],
  },
  api: CarouselApi,
  setApi: React.Dispatch<React.SetStateAction<CarouselApi>>
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>,
  className?: string,
}) {
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setDate(data.dates[api.selectedScrollSnap()])
    setMonth(data.dates[api.selectedScrollSnap()])
 
    api.on("select", () => {
      setDate(data.dates[api.selectedScrollSnap()])
      setMonth(data.dates[api.selectedScrollSnap()])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "center", axis: "y" }}
      plugins={[
        WheelGesturesPlugin({ forceWheelAxis: "y" })
      ]}
      orientation="vertical"
      className={cn("w-full max-w-lg", className)}
    >
      <CarouselContent 
        data={data.eventsDays}
        uniqDates={data.dates}
        duplicates={data.duplicates}
      />
    </Carousel>
  )
}


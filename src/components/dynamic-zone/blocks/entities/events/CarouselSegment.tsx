"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { EventDayT } from '@/lib/types/entities'
import React from 'react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import type { CarouselApi } from '@/components/ui/carousel'
import type { DateRange } from 'react-day-picker'
import { cn, dateRange } from '@/lib/utils'


export default function CarouselSegment({
  api,
  setApi,
  activeDates,
  days,
  setDate,
  setMonth,
  className,
}: {
  api: CarouselApi,
  setApi: React.Dispatch<React.SetStateAction<CarouselApi>>
  activeDates: Date[],
  days: EventDayT[],
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>,
  setMonth: React.Dispatch<React.SetStateAction<Date | undefined>>,
  className?: string,
}) {
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setDate(activeDates[api.selectedScrollSnap()])
    setMonth(activeDates[api.selectedScrollSnap()])
 
    api.on("select", () => {
      setDate(activeDates[api.selectedScrollSnap()])
      setMonth(activeDates[api.selectedScrollSnap()])
    })
  }, [api])

  // console.log(days[0].time)

  // console.log(eventDays)
  
  // eventDays.map(days => {
  //   const dates = dateRange('2020-10-25', '2020-10-28');
  //   console.log(dates.length);
  // })

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "center", axis: "y" }}
      plugins={[
        WheelGesturesPlugin({ forceWheelAxis: "y" })
      ]}
      orientation="vertical"
      className={cn("w-full max-w-xs", className)}
    >
      <CarouselContent className="-mt-4 h-[280px]">
        {activeDates.map((_, index) => (
          <CarouselItem key={index} className=''>
            <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
              <CardContent className="h-full flex items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

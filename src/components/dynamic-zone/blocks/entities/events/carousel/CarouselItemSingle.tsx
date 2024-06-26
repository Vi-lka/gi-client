"use client"

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import type { EventDayT } from "@/lib/types/entities";

export default function CarouselItemSingle({
  data,
  date
}: {
  data: {
    eventId: string;
    itemData: EventDayT;
  } | undefined
  date: Date
}) {
  return (
    <CarouselItem className=''>
      <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
        <CardContent className="h-full flex items-center justify-center p-6">
          {data
            ? <span className="text-sm font-semibold">{data.itemData.title}</span>
            : <span className="text-3xl font-semibold">{date.toDateString()}</span>
          }
        </CardContent>
      </Card>
    </CarouselItem>
  )
}
"use client"

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import type { EventDayT } from "@/lib/types/entities";
import Points from "./Points";

export default function CarouselItemSingle({
  date,
  data,
}: {
  date: Date
  data: {
    eventId: string;
    itemData: EventDayT | undefined;
  }
}) {
  return (
    <CarouselItem className=''>
      <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
        <CardContent className="h-full flex items-center justify-center p-6">
          <Points 
            date={date} 
            eventId={data.eventId} 
            itemData={data.itemData} 
          />
        </CardContent>
      </Card>
    </CarouselItem>
  )
}
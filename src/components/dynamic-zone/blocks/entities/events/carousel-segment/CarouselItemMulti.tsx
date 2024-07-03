"use client"

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { EventDayT } from "@/lib/types/entities";
import { motion } from "framer-motion";
import { useState } from "react";
import Points from "./Points";

export default function CarouselItemMulti({
  date,
  items,
  setActive
}: {
  date: Date;
  items: {
    eventId: string;
    itemData: EventDayT | undefined;
  }[];
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const [selectedTab, setSelectedTab] = useState(items[0].eventId);

  return (
    <CarouselItem className='relative pt-8 min-h-[316px]'>
      {items.length > 0
        ? (
        <Tabs value={selectedTab} defaultValue={items[0].eventId} className="h-full">
          <TabsList className="absolute top-4 -left-2 flex-wrap h-fit sm:justify-around justify-center gap-y-1 bg-apricot rounded-lg z-50">
            {items.map((item, indx) => (
              <TabsTrigger 
                key={item.eventId} 
                value={item.eventId}
                onClick={() => setSelectedTab(item.eventId)}
                className="relative inline-flex py-0.5 px-2.5 rounded-md text-base text-primary/80 hover:text-primary data-[state=active]:text-primary-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none transition-all duration-200"
              >
                {selectedTab === item.eventId && (
                  <motion.span
                    layoutId={`bubble${date}`}
                    className="absolute inset-0 z-[-1] bg-primary shadow rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {indx+1}
              </TabsTrigger>
            ))}
          </TabsList>
            {items.map((item, indx) => (
              <TabsContent key={item.eventId} value={item.eventId} className="h-full mt-0 animate-rotate-y animate-ease-in-out animate-duration-700">
                <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
                  <CardContent key={indx} className="h-full flex items-center justify-center p-6 animate-fade animate-duration-500 animate-delay-200 animate-ease-in">
                    <Points 
                      date={date} 
                      eventId={item.eventId} 
                      itemData={item.itemData}
                      setActive={setActive}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
        </Tabs>
        )
        : (
          <Card className='min-w-0 h-full bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-md shadow-sm rounded-3xl transition duration-300'>
            <CardContent className="h-full flex items-center justify-center p-6">
              <Points 
                date={date} 
                eventId={undefined}
                itemData={undefined}
                setActive={setActive}
              />
            </CardContent>
          </Card>
        )
      }
    </CarouselItem>
  )
}
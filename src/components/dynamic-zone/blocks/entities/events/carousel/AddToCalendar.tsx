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


export default function AddToCalendar({
    type,
    event,
    day,
    date,
    className
}: {
    type: "credenza" | "dialog" | "drawer",
    event: CalendarEvent,
    day: CalendarEvent,
    date: Date,
    className?: string,
}) {
    const locale = useLocale()

    const [selectedTab, setSelectedTab] = useState("event");

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
        {id: "event", title: "Все мероприятие"}, 
        {id: "day", title: `День: ${formatDate(date, locale)}`}
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
                        <FaApple className='mr-2'/> Apple<span className='text-xs ml-1'>(ics файл)</span>
                    </AddToCalendarItem>

                    <AddToCalendarItem type={type} href={eventICSUrl}>
                        <FaYandex className='mr-2'/> Яндекс<span className='text-xs ml-1'>(ics файл)</span>
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
                        <FaApple className='mr-2'/> Apple<span className='text-xs ml-1'>(ics файл)</span>
                    </AddToCalendarItem>

                    <AddToCalendarItem type={type} href={dayICSUrl}>
                        <FaYandex className='mr-2'/> Яндекс<span className='text-xs ml-1'>(ics файл)</span>
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

import { Schedule, ScheduleItem } from '@/components/dynamic-zone/blocks/schedule/Schedule';
import { TypographyH2 } from '@/components/typography'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { getDictionary } from '@/lib/getDictionary';
import type { EventDayT } from '@/lib/types/entities';
import { cn, formatDate } from '@/lib/utils';
import React from 'react'

export default async function ScheduleSection({
  locale,
  days
}: {
  locale: string,
  days: EventDayT[]
}) {

  const dict = await getDictionary(locale);

  return (
    <section id='schedule' className='lg:pt-14 pt-10'>
      <div className="w-full">
        <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
          {dict.Calendar.schedule}
        </TypographyH2>

        <Accordion type="single" collapsible className='md:hidden block'>
          {days.map((day, indx) => {
            const dayTitle = day.title 
              ? `${day.title} - ${formatDate(day.date, locale)}`
              : formatDate(day.date, locale)

            return (
              <AccordionItem 
                key={indx} 
                value={`schedule-accordion-${indx}`} 
                className='w-full border-none hover:pb-0'
              >
                <AccordionTrigger
                  className={cn(
                    'scroll-m-20 lg:mb-6 mb-4 py-2 text-center font-semibold tracking-tighter lg:text-2xl text-xl md:rounded-3xl rounded-2xl',
                    'bg-primary dark:bg-accent text-primary-foreground dark:text-primary [&>svg]:bg-primary dark:[&>svg]:bg-accent [&>svg]:text-primary-foreground dark:[&>svg]:text-primary'
                  )}
                >
                  <p className='mx-auto'>
                    {dayTitle}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <Schedule className='w-full'>
                    {day.points.map((point, indxPoint) => (
                      <ScheduleItem key={indxPoint} title={point.description} time={point.time.slice(0, 5)} />
                    ))}
                  </Schedule>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <div className='md:flex hidden flex-col md:gap-12 gap-8'>
          {days.map((day, indx) => {
            const dayTitle = day.title 
              ? `${day.title} - ${formatDate(day.date, locale)}`
              : formatDate(day.date, locale)

            return (
              <div key={indx} className='w-full mx-auto'>
                <h2 
                  className={cn(
                    'scroll-m-20 lg:mb-6 mb-4 py-2 text-center font-semibold tracking-tighter lg:text-2xl text-xl rounded-2xl',
                    'bg-primary dark:bg-accent text-primary-foreground dark:text-primary'
                  )}
                >
                  {dayTitle}
                  </h2>
                
                <Schedule className='w-full'>
                  {day.points.map((point, indxPoint) => (
                    <ScheduleItem key={indxPoint} title={point.description} time={point.time.slice(0, 5)} />
                  ))}
                </Schedule>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

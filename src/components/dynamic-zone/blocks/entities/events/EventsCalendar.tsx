import { ClientHydration } from '@/components/ClientHydration'
import CalendarBlocksLoading from '@/components/loadings/CalendarBlocksLoading'
import React from 'react'
import CalendarBlocks from './CalendarBlocks'
import type { EventsT } from '@/lib/types/entities'
import { dateRange, getDateIndx, matrixToArray } from '@/lib/utils'
import { fromZonedTime } from 'date-fns-tz'

export default function EventsCalendar({
  events
}: {
  events: EventsT
}) {

  const eventsDays = events.data.map(event => ({
    eventId: event.id,
    days: event.attributes.days
  }))

  const datesByEventId = events.data.map(event => {

    let dates: Date[]

    if (event.attributes.dateEnd) dates = dateRange(event.attributes.dateStart, event.attributes.dateEnd);
    else dates = [event.attributes.dateStart]

    return (
      { 
        id: event.id, 
        eventData: {
          slug: event.attributes.slug,
          title: event.attributes.title,
          location: event.attributes.location,
          online: event.attributes.online,
          dateStart: event.attributes.dateStart,
          dateEnd: event.attributes.dateEnd,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          text: event.attributes.text,
        },
        dates
      }
    )
  })

  const allDatesMatrix = datesByEventId.map(item => item.dates)
  const allDates = matrixToArray(allDatesMatrix)
  .sort((a,b) => {
    return a.getTime() - b.getTime();
  })

  // const formatedDates = allDates.map(date => fromZonedTime(date, "Asia/Krasnoyarsk"))
  
  const datesUniq = allDates.filter((item, index) => 
    getDateIndx(item, allDates) === index
  );

  const duplicatesDates = allDates.filter((item, index) => 
    allDates.some((elem, idx) => elem.toDateString() === item.toDateString() && idx !== index)
  )
  const duplicatesUniq = duplicatesDates.filter((item, index) => 
    getDateIndx(item, duplicatesDates) !== index
  );

  return (
    <ClientHydration fallback={<CalendarBlocksLoading />}>
      <CalendarBlocks
        dates={datesUniq}
        duplicates={duplicatesUniq}
        eventsDays={eventsDays}
        datesByEventId={datesByEventId}
      />
    </ClientHydration>
  )
}


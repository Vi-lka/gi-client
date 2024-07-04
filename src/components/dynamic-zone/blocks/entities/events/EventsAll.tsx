import ErrorHandler from '@/components/errors/ErrorHandler';
import { getEvents } from '@/lib/queries/events';
import type { CollectionAllCompT } from '@/lib/types/components';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'
import CalendarBlocks from './CalendarBlocks';
import { ClientHydration } from '@/components/ClientHydration';
import { dateRange, getDateIndx, matrixToArray } from '@/lib/utils'

export default function EventsAll({
  // searchParams,
  // data,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  data: CollectionAllCompT,
}) {
  const headersList = headers();
  const locale = headersList.get('x-locale') || "";

  return (
    <>
      <Suspense 
        // key={`search_news=${search}&page_news=${page}&per_news=${pageSize}`} 
        fallback={"Loading..."}
      >
        <EventsAllContent locale={locale} />
      </Suspense>
    </>
  )
}

async function EventsAllContent({
  locale
}: {
  locale: string
}) {

  const [ dataResult ] = await Promise.allSettled([ 
    getEvents({ 
      locale
    }) 
  ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler
      error={dataResult.reason as unknown}
      place="Events"
      notFound
      goBack={false}
    />
  )

  const eventsDays = dataResult.value.data.map(event => ({
    eventId: event.id,
    days: event.attributes.days
  }))

  const datesByEventId = dataResult.value.data.map(event => {
    if (event.attributes.dateEnd) { 
      const dates = dateRange(event.attributes.dateStart, event.attributes.dateEnd);
      return { 
        id: event.id, 
        eventData: {
          slug: event.attributes.slug,
          title: event.attributes.title,
          location: event.attributes.location,
          dateStart: event.attributes.dateStart,
          dateEnd: event.attributes.dateEnd,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          text: event.attributes.text,
        },
        dates
      }
    } else {
      return { 
        id: event.id, 
        eventData: {
          slug: event.attributes.slug,
          title: event.attributes.title,
          location: event.attributes.location,
          dateStart: event.attributes.dateStart,
          dateEnd: event.attributes.dateEnd,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          text: event.attributes.text,
        },
        dates: [event.attributes.dateStart]
      }
    }
  })

  const allDatesMatrix = datesByEventId.map(item => item.dates)
  const allDates = matrixToArray(allDatesMatrix)
  .sort((a,b) => {
    return a.getTime() - b.getTime();
  })
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
    <ClientHydration fallback={"...ClientHydration"}>
      <CalendarBlocks
        dates={datesUniq}
        duplicates={duplicatesUniq}
        eventsDays={eventsDays}
        datesByEventId={datesByEventId}
      />
    </ClientHydration>
  )
}

import ErrorHandler from '@/components/errors/ErrorHandler';
import { getEvents } from '@/lib/queries/events';
import type { CollectionAllCompT } from '@/lib/types/components';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'
import CalendarBlocks from './CalendarBlocks';
import { ClientHydration } from '@/components/ClientHydration';

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

  const allDates = dataResult.value.data.map((event) => {
    if (event.attributes.dateEnd) return { from: event.attributes.dateStart, to: event.attributes.dateEnd }
    else return event.attributes.dateStart
  })

  const eventsDays = dataResult.value.data.map((event) => ({
    eventId: event.id,
    days: event.attributes.days
  }))

  return (
    <ClientHydration fallback={"...ClientHydration"}>
      <CalendarBlocks 
        allDates={allDates}
        eventsDays={eventsDays}
      />
    </ClientHydration>
  )
}

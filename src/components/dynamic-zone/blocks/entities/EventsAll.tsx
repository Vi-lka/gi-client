import ErrorHandler from '@/components/errors/ErrorHandler';
import { Calendar } from '@/components/ui/calendar';
import { DictionariesType, getDictionary } from '@/lib/getDictionary';
import { getEvents } from '@/lib/queries/events';
import type { CollectionAllCompT } from '@/lib/types/components';
import { getDateLocale } from '@/lib/utils';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'

export default async function EventsAll({
  // searchParams,
  // data,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  data: CollectionAllCompT,
}) {
  const headersList = headers();
  const locale = headersList.get('x-locale') || "";

  const dict = await getDictionary(locale)

  return (
    <>
      <Suspense 
        // key={`search_news=${search}&page_news=${page}&per_news=${pageSize}`} 
        fallback={"Loading..."}
      >
        <EventsAllContent locale={locale} dict={dict} />
      </Suspense>
    </>
  )
}

async function EventsAllContent({
  locale,
  dict
}: {
  locale: string,
  dict: Dictionary,
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

  return (
    <div className='flex flex-wrap justify-between gap-6'>
      <div className='lg:w-[calc(33%-1.5rem)]'>
        <Calendar
          mode="single"
          selected={new Date()}
          ISOWeek
          lang={locale}
          // selected={date}
          // onSelect={setDate}
          className="w-full p-0"
        />
      </div>
    </div>
  )
}

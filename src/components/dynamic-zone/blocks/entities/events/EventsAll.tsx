import ErrorHandler from '@/components/errors/ErrorHandler';
import { getEvents } from '@/lib/queries/events';
import type { CollectionAllCompT } from '@/lib/types/components';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'
import CalendarBlocksLoading from '@/components/loadings/CalendarBlocksLoading';
import { getDictionary } from '@/lib/getDictionary';
import EventsLoading from '@/components/loadings/EventsLoading';
import BentoLoading from '@/components/loadings/BentoLoading';
import PaginationControls from '@/components/PaginationControls';
import dynamic from 'next/dynamic';
import EventLoading from '@/components/loadings/items/EventLoading';
import { Skeleton } from '@/components/ui/skeleton';

const EventsCalendar = dynamic(
  () => import('./EventsCalendar'), {loading: () => <CalendarBlocksLoading />}
)
const EventsBento = dynamic(
  () => import('../../entities-cards/bento/EventsBento'), {loading: () => <BentoLoading />}
)
const EventsItem = dynamic(
  () => import('../../entities-cards/EventsItem'), {loading: () => <EventLoading />}
)

const SearchField = dynamic(
  () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)

const DEFAULT_PAGE_SIZE = 10;

export default async function EventsAll({
  searchParams,
  data,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  data: CollectionAllCompT,
}) {
  const headersList = headers();
  const locale = headersList.get('x-locale') || "";
  const slug = headersList.get('x-slug') || undefined;

  const search = searchParams["search_events"] as string | undefined;
  const page = searchParams["page_events"] ?? "1";
  const pageSize = searchParams["per_events"] ?? DEFAULT_PAGE_SIZE;

  const dict = await getDictionary(locale)

  return (
    <>
      {(data.showSearch && (data.eventsConfig?.view === "classic" || data.eventsConfig?.view === "bento")) 
      && (
        <div className='w-full'>
            <SearchField placeholder={dict.Inputs.search} param='search_events' className='mb-6' />
        </div>
      )}
      <Suspense 
        key={`search_events=${search}&page_events=${page}&per_events=${pageSize}`} 
        fallback={
          data.eventsConfig?.view === "classic"
            ? <EventsLoading /> 
            : data.eventsConfig?.view === "bento" ? <BentoLoading /> : <CalendarBlocksLoading />
        }
      >
        <EventsAllContent 
          locale={locale} 
          slug={slug}
          dict={dict}
          data={data}
          searchParams={searchParams} 
        />
      </Suspense>
    </>
  )
}

async function EventsAllContent({
  locale,
  slug,
  dict,
  data,
  searchParams,
}: {
  locale: string,
  slug: string | undefined,
  dict: Dictionary,
  data: CollectionAllCompT,
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams["search_events"] as string | undefined;
  const page = searchParams["page_events"] ?? "1";
  const pageSize = searchParams["per_events"] ?? DEFAULT_PAGE_SIZE;

  const [ dataResult ] = await Promise.allSettled([ 
    getEvents({ 
      locale,
      search, 
      page: Number(page), 
      pageSize: Number(pageSize),
      filterBy: data.connected ? slug : undefined
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
    <>
      {(data.eventsConfig?.view === "classic" || data.eventsConfig?.view === "bento")
        ? (
          <>
            {data.eventsConfig?.view === "bento"
              ? (
                <div key={`search_events=${search}&page_events=${page}&per_events=${pageSize}`}  id="events">
                  <EventsBento locale={locale} events={dataResult.value} dict={dict} />
                </div>
              )
              : (
                <div key={`search_events=${search}&page_events=${page}&per_events=${pageSize}`}  id="events" className="grid grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
                  {dataResult.value.data.map(item => (
                    <EventsItem key={"event" + item.id} locale={locale} item={item} dict={dict} /> 
                  ))}
                </div>
              )
            }
            <div className={data.eventsConfig?.view === "bento" ? "mt-8" : "mt-6"}>
              <PaginationControls
                length={dataResult.value.meta.pagination.total}
                defaultPageSize={DEFAULT_PAGE_SIZE}
                scrollToId='events'
                pageParam='page_events'
                perParam='per_events'
                showMore={false}
              />
            </div>
          </>
        )
        : (
          <EventsCalendar events={dataResult.value} />
        )
      }
    </>
  )
}

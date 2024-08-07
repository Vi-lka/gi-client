import Anchors from '@/components/Anchors';
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ClientHydration } from '@/components/ClientHydration';
import ImageComp from '@/components/ImageComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { EventsSinglePageT } from '@/lib/types/pages';
import { formatDate } from '@/lib/utils';
import { CalendarPlus, Globe, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import NextLink from "next/link"
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import type { Metadata } from 'next';
import getMetadataEventsSingle from '@/lib/queries/metadata/info/getMetadataEventsSingle';
import ScheduleSection from './ScheduleSection';
import CredenzaPopup from '@/components/CredenzaPopup';
import { Button } from '@/components/ui/button';
import AddToCalendar from '@/components/dynamic-zone/blocks/entities/events/segments/carousel-segment/AddToCalendar';
import { getDictionary } from '@/lib/getDictionary';


export async function generateMetadata({ 
  params: { locale, slug }
}:  { 
  params: { locale: string, slug: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataEventsSingle(locale, slug) ]);

  if (dataResult.status === "rejected") {
    console.error(dataResult.reason)
    return {}
  }

  const metadata = dataResult.value

  return {
    title: metadata.title,
    openGraph: {
      title: metadata.title,
      images: metadata.image.data?.attributes.url ?? "/hero-image.jpeg",
      locale: locale,
    }
  }
}

export default async function EventsSinglePage({
  params,
  searchParams,
}: {
  params: { locale: string, slug: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const dict = await getDictionary(params.locale)

  const getEventBySlug = async (locale: string, slug: string) => {
    const query = /* GraphGL */ `
      query EventsBySlug($locale: I18NLocaleCode, $filters: EventFiltersInput) {
        info(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        eventsPage(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        events(locale: $locale, filters: $filters) {
          data {
            id
            attributes {
              title
              slug
              image {
                data {
                  attributes { url }
                }
              }
              showSchedule
              location online
              text
              dateStart dateEnd
              days(sort: "date:asc") {
                id
                title
                date
                points(sort: "time:asc") {
                  time
                  description
                  text
                }
              }
              content {
                ${dynamicContentQuery}
              }
            }
          }
        }
      }
    `;

    const json = await fetchData<{ 
      data: { 
        info: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        eventsPage: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        events: {
          data: EventsSinglePageT[]
        }
      }
    }>({ 
      query, 
      error: `Failed to fetch Event: ${slug}`, 
      variables: {
        locale,
        filters: {
          slug: {
            eqi: slug
          }
        }
      }
    })
      
    // await new Promise((resolve) => setTimeout(resolve, 2000))
      
    if (json.data.info.data === null || json.data.eventsPage.data === null || json.data.events.data.length === 0) notFound();

    const infoTitle = json.data.info.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.info.data.attributes.navBarConfig.navBarTitle
      : json.data.info.data.attributes.title;

    const eventsPageTitle = json.data.eventsPage.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.eventsPage.data.attributes.navBarConfig.navBarTitle
      : json.data.eventsPage.data.attributes.title;
    
    const event = EventsSinglePageT.parse(json.data.events.data[0]);
    
    return { infoTitle, eventsPageTitle, event };
  };

  const [ dataResult ] = await Promise.allSettled([ getEventBySlug(params.locale, params.slug) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place={`Event (${params.slug})`}
      notFound
      goBack
    />
  )

  const event = dataResult.value.event.attributes

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.infoTitle, slug: "info" }, 
        { title: dataResult.value.eventsPageTitle, slug: "events" },
        { title: event.title, slug: params.slug }
      ]}/>

      <div className='mt-6'>
        <div className='lg:w-1/3 lg:float-right lg:ml-8'>
          <div className='relative aspect-video overflow-hidden rounded-3xl mb-3'>
            <ClientHydration fallback={<Skeleton className='w-full h-full'/>}>
              <ImageComp 
                src={event.image.data?.attributes.url}
                alt={event.title}
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover'
              />
            </ClientHydration>
          </div>

          <div className='flex gap-2 mb-6'>
            <div className='flex flex-wrap items-center gap-2 flex-1'>
              <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
                <IoCalendarOutline className='w-auto h-5' />
                <p className='flex-1'>
                  {formatDate(event.dateStart, params.locale)}
                  {event.dateEnd ? " - " + formatDate(event.dateEnd, params.locale) : ""}
                </p>
              </div>

              <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
                <MapPin className='w-auto h-5' />
                <NextLink 
                  href={`https://maps.yandex.ru/?text=${event.location}`}
                  target='__blank'
                  className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all transform-gpu duration-300'
                >
                  {event.location}
                </NextLink>
              </div>

              {event.online && (
                <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
                  <Globe className='w-auto h-5' />
                  <NextLink 
                    href={event.online}
                    target='__blank'
                    className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all transform-gpu duration-300'
                  >
                    {new URL(event.online).hostname}
                  </NextLink>
                </div>
              )}
            </div>

            <ClientHydration fallback={<Skeleton className='w-9 h-9 rounded-xl'/>}>
              <CredenzaPopup
                trigger={
                  <Button
                    variant="secondary"
                    className='px-2 bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground hover:text-primary transition-all duration-200 rounded-xl'
                  >
                    <CalendarPlus className='w-5 h-5' />
                  </Button>
                }
                title={dict.Calendar.select}
                description={dict.Calendar.selectDescription}
              >
                <AddToCalendar 
                  type="credenza"
                  date={dataResult.value.event.attributes.dateStart}
                  eventId={dataResult.value.event.id}
                  itemData={undefined}
                  className='md:mb-1 mb-6'
                />
              </CredenzaPopup>
            </ClientHydration>
          </div>

          <Anchors data={event.content} className='mb-6 lg:flex hidden'/>
        </div>

        <div className=''>
          <TypographyH1 className='font-semibold text-primary lg:text-4xl sm:text-3xl text-2xl mb-3'>
            {event.title}
          </TypographyH1>

          <Anchors data={event.content} className='mb-6 lg:hidden'/>
          
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <BlocksRendererStrapi content={event.text} />
        </div>
      </div>

      {(event.showSchedule && event.days.length > 0) && (
        <div className='w-full lg:float-left'>
          <ScheduleSection locale={params.locale} days={event.days} />
        </div>
      )}

      <div className='w-full lg:float-left'>
        {event.content.map((item, index) => (
          <section id={item.link ? item.link : undefined} key={index}>
            <DynamicZone item={item} searchParams={searchParams} />
          </section>
        ))}
      </div>
    </div>
  )
}

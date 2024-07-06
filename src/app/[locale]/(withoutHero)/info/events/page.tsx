import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { EventsPageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function EventsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getEventsPage = async (locale: string) => {
    const query = /* GraphGL */ `
    query EventsPage($locale: I18NLocaleCode) {
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
          data: EventsPageT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Events Page",
      variables: {
        locale
      }
    })
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    if (json.data.info.data === null || json.data.eventsPage.data === null) notFound();

    const infoTitle = json.data.info.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.info.data.attributes.navBarConfig.navBarTitle
      : json.data.info.data.attributes.title;

    const eventsPage = EventsPageT.parse(json.data.eventsPage.data);

    return { infoTitle, eventsPage };
  };

  const [ dataResult ] = await Promise.allSettled([ getEventsPage(locale) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Events Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.eventsPage.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.eventsPage.attributes.navBarConfig.navBarTitle 
    : dataResult.value.eventsPage.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.infoTitle, slug: "info" }, 
        { title: breadcrumbsTitle, slug: "events" }
      ]} />
    
      <TypographyH1 className='font-semibold text-primary my-6'>
        {dataResult.value.eventsPage.attributes.title}
      </TypographyH1>
    
      <Anchors data={dataResult.value.eventsPage.attributes.content} />
    
      {dataResult.value.eventsPage.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}

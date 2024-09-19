import Breadcrumbs from '@/components/Breadcrumbs'
import { TypographyH1 } from '@/components/typography'
import React from 'react'
import ErrorHandler from '@/components/errors/ErrorHandler'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import { notFound } from 'next/navigation'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery'
import Anchors from '@/components/Anchors'
import { JournalsPageT } from '@/lib/types/pages'
import fetchData from '@/lib/queries/fetchData'

export default async function JournalsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getJournalsPage = async (): Promise<JournalsPageT> => {
    const query = /* GraphGL */ `
      query JournalsPage($locale: I18NLocaleCode) {
        journalsPage(locale: $locale) {
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
        journalsPage: { 
          data: JournalsPageT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Journals Page",
      variables: {
        locale
      }
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    if (json.data.journalsPage.data === null) notFound();
    
    const journalsPage = JournalsPageT.parse(json.data.journalsPage.data);
    
    return journalsPage;
  };
  

  const [ dataResult ] = await Promise.allSettled([ getJournalsPage() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Journals Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.attributes.navBarConfig.navBarTitle 
    : dataResult.value.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[{ title: breadcrumbsTitle, slug: "journals" }]} />

      <TypographyH1 className='font-semibold text-primary my-6'>
        {dataResult.value.attributes.title}
      </TypographyH1>

      <Anchors data={dataResult.value.attributes.content} />

      {dataResult.value.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}

import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { InfoPageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function InfoPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getInfoPage = async (): Promise<InfoPageT> => {
    const query = /* GraphGL */ `
    query InfoPage($locale: I18NLocaleCode) {
      info(locale: $locale) {
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
          data: InfoPageT 
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Info Page",
        variables: {
            locale
        }
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    if (json.data.info.data === null) notFound();

    const infoPage = InfoPageT.parse(json.data.info.data);

    return infoPage;
  };


  const [ dataResult ] = await Promise.allSettled([ getInfoPage() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Info Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.attributes.navBarConfig?.navBarTitle
    ? dataResult.value.attributes.navBarConfig.navBarTitle
    : dataResult.value.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[{ title: breadcrumbsTitle, slug: "info" }]} />
    
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

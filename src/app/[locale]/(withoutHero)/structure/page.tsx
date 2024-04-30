import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { StructurePageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function StructurePage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getStructurePage = async (locale: string,): Promise<StructurePageT> => {
    const query = /* GraphGL */ `
    query StructurePage($locale: I18NLocaleCode) {
      structure(locale: $locale) {
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
        structure: { 
          data: StructurePageT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Structure Page",
      variables: {
        locale
      }
    })
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    if (json.data.structure.data === null) notFound();

    const structure = StructurePageT.parse(json.data.structure.data);

    return structure;
  };
  

  const [ dataResult ] = await Promise.allSettled([ getStructurePage(locale) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Structure Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.attributes.navBarConfig.navBarTitle 
    : dataResult.value.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[{ title: breadcrumbsTitle, slug: "structure" }]} />
    
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

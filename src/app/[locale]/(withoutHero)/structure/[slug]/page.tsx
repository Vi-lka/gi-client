import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1, TypographyH2 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { notFound } from 'next/navigation';
import React from 'react'
import { getDictionary } from '@/lib/getDictionary';
import Media from './Media';
import Description from './Description';
import { DepartmentSinglePageT } from '@/lib/types/pages';

export const dynamic = 'force-dynamic'

export default async function StructureSinglePage({
  params,
  searchParams,
}: { 
  params: { locale: string, slug: string },
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary(params.locale);

  const getStructureBySlug = async (locale: string, slug: string) => {
    const query = /* GraphGL */ `
      query Departments($locale: I18NLocaleCode, $filters: DepartmentFiltersInput,) {
        structure(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        departments(locale: $locale, filters: $filters) {
          data {
            id
            attributes {
              title
              slug
              media {
                data {
                  attributes { url }
                }
              }
              description_title
              description
              contacts {
                url
                email
                phone
                location
              }
              head {
                data {
                  id
                  attributes {
                    slug
                    title
                  }
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
        structure: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        departments: {
          data: DepartmentSinglePageT[]
        }
      }
    }>({ 
      query, 
      error: `Failed to fetch Department: ${slug}`, 
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
      
    if (json.data.structure.data === null || json.data.departments.data.length === 0) notFound();

    const structureTitle = json.data.structure.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.structure.data.attributes.navBarConfig.navBarTitle
      : json.data.structure.data.attributes.title;
    
    const department = DepartmentSinglePageT.parse(json.data.departments.data[0]);
    
    return { structureTitle, department };
  };

  const [ dataResult ] = await Promise.allSettled([ getStructureBySlug(params.locale, params.slug) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place={`Structure (${params.slug})`}
      notFound
      goBack
    />
  )

  const head = dataResult.value.department.attributes.head.data 
    ? {
      title: dataResult.value.department.attributes.head.data.attributes.title,
      slug: dataResult.value.department.attributes.head.data.attributes.slug
    } : null;

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.structureTitle, slug: "structure" }, 
        { title: dataResult.value.department.attributes.title, slug: params.slug }
      ]}/>

      <TypographyH1 className='font-semibold text-primary my-6 text-3xl'>
        {dataResult.value.department.attributes.title}
      </TypographyH1>

      <Anchors data={dataResult.value.department.attributes.content} />

      <Media media={dataResult.value.department.attributes.media} className='my-6' />

      {dataResult.value.department.attributes.description_title && (
        <TypographyH2 className='font-semibold text-primary my-6'>
          {dataResult.value.department.attributes.description_title}
        </TypographyH2>
      )}

      <Description 
        locale={params.locale}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        description={dataResult.value.department.attributes.description} 
        contacts={dataResult.value.department.attributes.contacts} 
        contactsTitle={dict.Entities.Structure.contacts}
        head={head}
      />

      {dataResult.value.department.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}
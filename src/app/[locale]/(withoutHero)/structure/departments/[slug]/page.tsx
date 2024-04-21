import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { DepartmentPageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function DepartmentPage({ 
    params,
    searchParams,
}: { 
    params: { locale: string, slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    const getDepartmentBySlug = async (locale: string, slug: string) => {
        const query = /* GraphGL */ `
          query Departments($locale: I18NLocaleCode, $filters: DepartmentFiltersInput,) {
            structure(locale: $locale) {
              data {
                attributes {
                  title
                }
              }
            }
            departments(locale: $locale, filters: $filters) {
              data {
                id
                attributes {
                  title
                  slug
                  image {
                    data {
                      attributes {
                        url
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
                        attributes: { title: string }
                    } | null
                },
                departments: {
                    data: DepartmentPageT[]
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

        const structureTitle = json.data.structure.data.attributes.title;
      
        const department = DepartmentPageT.parse(json.data.departments.data[0]);
      
        return { structureTitle, department };
    };

    const [ dataResult ] = await Promise.allSettled([ getDepartmentBySlug(params.locale, params.slug) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place={`Department (${params.slug})`}
            notFound
            goBack
        />
    )

    return (
        <div className='w-full'>
            <Breadcrumbs data={[
                { title: dataResult.value.structureTitle, slug: "structure" }, 
                { title: dataResult.value.department.attributes.title, slug: params.slug }
            ]}/>

            <TypographyH1 className='font-semibold text-primary my-6'>
                {dataResult.value.department.attributes.title}
            </TypographyH1>

            <Anchors data={dataResult.value.department.attributes.content} />

            {dataResult.value.department.attributes.content.map((item, index) => (
                <section id={item.link ? item.link : undefined} key={index}>
                    <DynamicZone item={item} searchParams={searchParams} />
                </section>
            ))}
        </div>
    )
}

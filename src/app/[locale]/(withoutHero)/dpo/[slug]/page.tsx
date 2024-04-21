import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { DpoCoursePageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function DpoCoursePage({ 
    params,
    searchParams,
}: { 
    params: { locale: string, slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    const getDpoCourseBySlug = async (locale: string, slug: string) => {
        const query = /* GraphGL */ `
          query DpoCourse($locale: I18NLocaleCode, $filters: DpoCourseFiltersInput,) {
            dpo(locale: $locale) {
              data {
                attributes {
                  title
                }
              }
            }
            dpoCourses(locale: $locale, filters: $filters) {
              data {
                id
                attributes {
                  title
                  slug
                  dateStart
                  dateEnd
                  location
                  hours
                  price
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
                dpo: { 
                    data: {
                        attributes: { title: string }
                    } | null
                },
                dpoCourses: {
                    data: DpoCoursePageT[]
                }
            }
        }>({ 
            query, 
            error: `Failed to fetch DPO Course: ${slug}`, 
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
        
        if (json.data.dpo.data === null || json.data.dpoCourses.data.length === 0) notFound();

        const dpoTitle = json.data.dpo.data.attributes.title;
      
        const dpoCourse = DpoCoursePageT.parse(json.data.dpoCourses.data[0]);
      
        return { dpoTitle, dpoCourse };
    };

    const [ dataResult ] = await Promise.allSettled([ getDpoCourseBySlug(params.locale, params.slug) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place={`DPO Course (${params.slug})`}
            notFound
            goBack
        />
    )

    return (
        <div className='w-full'>
            <Breadcrumbs data={[
                { title: dataResult.value.dpoTitle, slug: "dpo" }, 
                { title: dataResult.value.dpoCourse.attributes.title, slug: params.slug }
            ]}/>

            <TypographyH1 className='font-semibold text-primary my-6'>
                {dataResult.value.dpoCourse.attributes.title}
            </TypographyH1>

            <Anchors data={dataResult.value.dpoCourse.attributes.content} />

            {dataResult.value.dpoCourse.attributes.content.map((item, index) => (
                <section id={item.link ? item.link : undefined} key={index}>
                    <DynamicZone item={item} searchParams={searchParams} />
                </section>
            ))}
        </div>
    )
}

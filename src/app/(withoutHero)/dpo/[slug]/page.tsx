import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { fetchData } from '@/lib/queries';
import { DpoCoursePageT } from '@/lib/types';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function DpoCoursePage({ 
    params,
    searchParams,
}: { 
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const getDpoTitle = async (): Promise<string> => {
        const query = /* GraphGL */ `
        query DpoTitle {
            dpo {
            data {
              attributes {
                title
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
                } 
            }; 
        }>({ 
            query, 
            error: "Failed to fetch DPO Title",
        })

        if (json.data.dpo.data === null) notFound();
    
        return json.data.dpo.data.attributes.title;
    };

    const getDpoCourseBySlug = async (slug: string): Promise<DpoCoursePageT> => {
        const query = /* GraphGL */ `
          query DpoCourse($filters: DpoCourseFiltersInput,) {
            dpoCourses(filters: $filters) {
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
                dpoCourses: {
                    data: DpoCoursePageT[]
                }
            }
        }>({ 
            query, 
            error: `Failed to fetch DPO Course: ${slug}`, 
            variables: {
                filters: {
                    slug: {
                        eqi: slug
                    }
                  }
            }
        })
        
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        
        if (json.data.dpoCourses.data.length === 0) notFound();
      
        const dpoCourse = DpoCoursePageT.parse(json.data.dpoCourses.data[0]);
      
        return dpoCourse;
    };

    const [ dataResult, dpoTitleResult ] = await Promise.allSettled([ 
        getDpoCourseBySlug(params.slug),
        getDpoTitle()
    ]);
    if (dpoTitleResult.status === "rejected") return (
        <ErrorHandler 
            error={dpoTitleResult.reason as unknown} 
            place={`DPO Title (${params.slug})`}
            notFound
            goBack
        />
    )
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
                { title: dpoTitleResult.value, slug: "dpo" }, 
                { title: dataResult.value.attributes.title, slug: params.slug }
            ]}/>

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

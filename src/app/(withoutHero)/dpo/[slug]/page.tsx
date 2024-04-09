import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { fetchData } from '@/lib/queries';
import { DpoCoursePageT } from '@/lib/types';
import { Link } from 'lucide-react';
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

    const anchors = dataResult.value.attributes.content.map(item => {
        const label = item.linkTitle
        const link = item.link !== null ? "#" + item.link : null
        return { label, link }
    })

    return (
        <div className='w-full'>
            <Breadcrumbs data={[
                { title: dpoTitleResult.value, slug: "dpo" }, 
                { title: dataResult.value.attributes.title, slug: params.slug }
            ]}/>

            <TypographyH1 className='font-semibold text-primary my-6'>
                {dataResult.value.attributes.title}
            </TypographyH1>

            <div className='flex flex-wrap gap-y-3 lg:gap-x-6 gap-x-3 mt-6'>
                {anchors.map((anchor, index) => {
                    if (typeof anchor.label === "string" && typeof anchor.link === "string") return (
                        <Link 
                            key={index}
                            href={anchor.link}
                            className="h-fit text-sm 2xl:py-2 py-1 2xl:px-6 md:px-3 group inline-flex w-max items-center justify-center rounded-full bg-card text-primary px-4 font-semibold transition-colors hover:bg-primary hover:text-background focus:bg-primary focus:text-background focus:outline-none"
                        >
                            {anchor.label}
                        </Link>
                    )
                })}
            </div>

            {dataResult.value.attributes.content.map((item, index) => (
                <section id={item.link ? item.link : undefined} key={index}>
                    <DynamicZone item={item} searchParams={searchParams} />
                </section>
            ))}
        </div>
    )
}

import Breadcrumbs from '@/components/Breadcrumbs'
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { fetchData } from '@/lib/queries';
import { EducationalProgramPageT } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function EducationalProgramPage({ 
    params,
    searchParams,
}: { 
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const getEntranceTitle = async (): Promise<string> => {
        const query = /* GraphGL */ `
        query EntranceTitle {
          entrancePage {
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
                entrancePage: { 
                    data: {
                        attributes: { title: string }
                    } | null
                } 
            }; 
        }>({ 
            query, 
            error: "Failed to fetch Entrance Title",
        })

        if (json.data.entrancePage.data === null) notFound();
    
        return json.data.entrancePage.data.attributes.title;
    };

    const getEducationalProgramBySlug = async (slug: string): Promise<EducationalProgramPageT> => {
        const query = /* GraphGL */ `
          query EducationalPrograms($filters: EducationalProgramFiltersInput) {
            educationalPrograms(filters: $filters) {
              data {
                id
                attributes {
                  slug
                  title
                  type
                  code
                  mainName
                  mainCode
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
                educationalPrograms: {
                    data: EducationalProgramPageT[]
                }
            }
        }>({ 
            query, 
            error: `Failed to fetch Educational Program: ${slug}`, 
            variables: {
                filters: {
                    slug: {
                        eqi: slug
                    }
                  }
            }
        })
        
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        
        if (json.data.educationalPrograms.data.length === 0) notFound();
      
        const educationalProgram = EducationalProgramPageT.parse(json.data.educationalPrograms.data[0]);
      
        return educationalProgram;
    };
  

    const [ dataResult, entranceTitleResult ] = await Promise.allSettled([ 
        getEducationalProgramBySlug(params.slug),
        getEntranceTitle()
    ]);
    if (entranceTitleResult.status === "rejected") return (
        <ErrorHandler 
            error={entranceTitleResult.reason as unknown} 
            place={`Entrance Title (${params.slug})`}
            notFound
            goBack
        />
    )
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place={`Educational Program (${params.slug})`}
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
                { title: entranceTitleResult.value, slug: "entrance" }, 
                { title: dataResult.value.attributes.title, slug: params.slug }
            ]}/>

            <TypographyH1 className='font-semibold text-primary my-6'>
                {dataResult.value.attributes.title}
            </TypographyH1>

            <div className='flex gap-x-28 gap-y-3 flex-wrap text-sm text-primary'>
                <div className=''>
                    <p>Код направления подготовки:</p>
                    <p>
                        {dataResult.value.attributes.mainCode} <span className="font-semibold">{dataResult.value.attributes.mainName}</span>
                    </p>
                </div>
                <div className=''>
                    <p>Код профиля:</p>
                    <p>
                        {dataResult.value.attributes.code} <span className="font-semibold">{dataResult.value.attributes.title}</span>
                    </p>
                </div>
            </div>

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

import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs'
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { fetchData } from '@/lib/queries';
import { EducationalProgramPageT } from '@/lib/types';
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

            <Anchors data={dataResult.value.attributes.content} />

            {dataResult.value.attributes.content.map((item, index) => (
                <section id={item.link ? item.link : undefined} key={index}>
                    <DynamicZone item={item} searchParams={searchParams} />
                </section>
            ))}
        </div>
    )
}

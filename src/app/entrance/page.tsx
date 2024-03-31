import Breadcrumbs from '@/components/Breadcrumbs'
import { TypographyH1 } from '@/components/typography'
import Link from 'next/link'
import React from 'react'
import { fetchData } from '@/lib/queries'
import ErrorHandler from '@/components/errors/ErrorHandler'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import { EntrancePageT } from '@/lib/types'
import { notFound } from 'next/navigation'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery'

export default async function EntrancePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const getEntrancePage = async (): Promise<EntrancePageT> => {
        const query = /* GraphGL */ `
        query EntrancePage {
          entrancePage {
            data {
              attributes {
                title
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
                entrancePage: { 
                    data: EntrancePageT 
                } 
            }; 
        }>({ 
            query, 
            error: "Failed to fetch Entrance Page",
        })

        // await new Promise((resolve) => setTimeout(resolve, 2000))

        if (json.data.entrancePage.data === null) notFound();
    
        const entrancePage = EntrancePageT.parse(json.data.entrancePage.data);
    
        return entrancePage;
    };
  

    const [ dataResult ] = await Promise.allSettled([ getEntrancePage() ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Entrance Page"
            notFound={false}
        />
    )

    const anchors = dataResult.value.attributes.content.map(item => {
        const label = item.linkTitle
        const link = item.link !== null ? "#" + item.link : null
        return { label, link }
    })

    return (
        <div className='w-full'>
            <Breadcrumbs />

            <TypographyH1 className='font-semibold text-primary my-6'>
                Поступление
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
                <section id={item.link ? item.link : undefined} key={index} className='lg:pt-28 pt-20'>
                    <DynamicZone item={item} searchParams={searchParams} />
                </section>
            ))}
        </div>
    )
}

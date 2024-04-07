import Breadcrumbs from '@/components/Breadcrumbs'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { fetchData } from '@/lib/queries';
import { JustWaitPageT } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function JustWait({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const getJustWaitPage = async (): Promise<JustWaitPageT> => {
        const query = /* GraphGL */ `
        query JustWaitPage {
            justWait {
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
                justWait: { 
                    data: JustWaitPageT 
                } 
            }; 
        }>({ 
            query, 
            error: "Failed to fetch Just Wait Page",
        })

        // await new Promise((resolve) => setTimeout(resolve, 2000))

        if (json.data.justWait.data === null) notFound();
    
        const justWait = JustWaitPageT.parse(json.data.justWait.data);
    
        return justWait;
    };
  

    const [ dataResult ] = await Promise.allSettled([ getJustWaitPage() ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Just Wait Page"
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
            <Breadcrumbs data={[{ title: dataResult.value.attributes.title, slug: "just-wait" }]} />

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

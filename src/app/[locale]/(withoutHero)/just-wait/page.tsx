import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { JustWaitPageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'

export default async function JustWait({
    params: { locale },
    searchParams,
}: {
    params: { locale: string },
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const getJustWaitPage = async (locale: string): Promise<JustWaitPageT> => {
        const query = /* GraphGL */ `
        query JustWaitPage($locale: I18NLocaleCode) {
            justWait(locale: $locale) {
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
            variables: {
                locale
            }
        })

        // await new Promise((resolve) => setTimeout(resolve, 2000))

        if (json.data.justWait.data === null) notFound();
    
        const justWait = JustWaitPageT.parse(json.data.justWait.data);
    
        return justWait;
    };
  

    const [ dataResult ] = await Promise.allSettled([ getJustWaitPage(locale) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Just Wait Page"
            notFound={false}
        />
    )

    return (
        <div className='w-full'>
            <Breadcrumbs data={[{ title: dataResult.value.attributes.title, slug: "just-wait" }]} />

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

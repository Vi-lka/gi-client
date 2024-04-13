import Breadcrumbs from '@/components/Breadcrumbs'
import { TypographyH1 } from '@/components/typography'
import React from 'react'
import { fetchData } from '@/lib/queries'
import ErrorHandler from '@/components/errors/ErrorHandler'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import { EntrancePageT } from '@/lib/types'
import { notFound } from 'next/navigation'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery'
import Anchors from '@/components/Anchors'

export const dynamic = 'force-dynamic'

export default async function AdmissionPage({
    params: { locale },
    searchParams,
}: {
    params: { locale: string },
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const getEntrancePage = async (): Promise<EntrancePageT> => {
        const query = /* GraphGL */ `
        query EntrancePage($locale: I18NLocaleCode) {
          entrancePage(locale: $locale) {
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
            error: "Failed to fetch Admission Page",
            variables: {
                locale
            }
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
            place="Admission Page"
            notFound={false}
        />
    )

    return (
        <div className='w-full'>
            <Breadcrumbs data={[{ title: dataResult.value.attributes.title, slug: "admission" }]} />

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

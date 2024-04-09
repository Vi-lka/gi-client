import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { fetchData } from '@/lib/queries';
import { DpoPageT } from '@/lib/types';
import { notFound } from 'next/navigation';
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function DpoPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const getDpoPage = async (): Promise<DpoPageT> => {
        const query = /* GraphGL */ `
        query DpoPage {
            dpo {
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
                dpo: { 
                    data: DpoPageT 
                } 
            }; 
        }>({ 
            query, 
            error: "Failed to fetch DPO Page",
        })

        // await new Promise((resolve) => setTimeout(resolve, 2000))

        if (json.data.dpo.data === null) notFound();
    
        const dpoPage = DpoPageT.parse(json.data.dpo.data);
    
        return dpoPage;
    };
  

    const [ dataResult ] = await Promise.allSettled([ getDpoPage() ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="DPO Page"
            notFound={false}
        />
    )

    return (
        <div className='w-full'>
            <Breadcrumbs data={[{ title: dataResult.value.attributes.title, slug: "dpo" }]} />

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

import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { DpoPageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'
import type { Metadata } from 'next';
import getMetadataDPO from '@/lib/queries/metadata/dpo/getMetadataDPO';

export async function generateMetadata({ 
    params: { locale }
  }:  { 
    params: { locale: string }
  }): Promise<Metadata> {
  
    const [ dataResult ] = await Promise.allSettled([ getMetadataDPO(locale) ]);
  
    if (dataResult.status === "rejected") return {}
  
    const metadata = dataResult.value.data
  
    return {
      title: metadata.title,
      description: metadata.navBarConfig?.navBarDescription,
      openGraph: {
        title: metadata.title,
        description: metadata.navBarConfig?.navBarDescription ? metadata.navBarConfig?.navBarDescription : undefined,
        images: metadata.navBarConfig?.navBarImage.data?.attributes.url ?? "/hero-image.jpeg",
        locale: locale,
      }
    }
}

export default async function DpoPage({
    params: { locale },
    searchParams,
}: {
    params: { locale: string },
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const getDpoPage = async (): Promise<DpoPageT> => {
        const query = /* GraphGL */ `
        query DpoPage($locale: I18NLocaleCode) {
            dpo(locale: $locale) {
            data {
              attributes {
                title
                navBarConfig { navBarTitle }
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
            variables: {
                locale
            }
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

    const breadcrumbsTitle = dataResult.value.attributes.navBarConfig?.navBarTitle 
        ? dataResult.value.attributes.navBarConfig.navBarTitle 
        : dataResult.value.attributes.title

    return (
        <div className='w-full'>
            <Breadcrumbs data={[{ title: breadcrumbsTitle, slug: "dpo" }]} />

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

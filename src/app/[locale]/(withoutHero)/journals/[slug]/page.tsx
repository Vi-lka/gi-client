import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import getMetadataJournal from '@/lib/queries/metadata/journals/getMetadataJournal';
import { JournalSinglePageT } from '@/lib/types/pages';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ 
  params: { locale, slug }
}:  { 
  params: { locale: string, slug: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataJournal(locale, slug) ]);

  if (dataResult.status === "rejected") {
    console.error(dataResult.reason)
    return {}
  }

  const metadata = dataResult.value

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description ? metadata.description : undefined,
      images: metadata.image.data?.attributes.url ?? "/hero-image.jpeg",
      locale: locale,
    }
  }
}

export default async function JournalPage({ 
    params,
    searchParams,
}: { 
    params: { locale: string, slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    const getJournalBySlug = async (locale: string, slug: string) => {
        const query = /* GraphGL */ `
          query Journal($locale: I18NLocaleCode, $filters: JournalFiltersInput,) {
            journalsPage(locale: $locale) {
              data {
                attributes {
                  title
                  navBarConfig { navBarTitle }
                }
              }
            }
            journals(locale: $locale, filters: $filters) {
              data {
                id
                attributes {
                  title
                  slug
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
                journalsPage: { 
                    data: {
                        attributes: { 
                          title: string,
                          navBarConfig: {
                            navBarTitle: string | null
                          } | null
                        }
                    } | null
                },
                journals: {
                    data: JournalSinglePageT[]
                }
            }
        }>({ 
            query, 
            error: `Failed to fetch Journals Course: ${slug}`,
            variables: {
                locale,
                filters: {
                    slug: {
                        eqi: slug
                    }
                  }
            }
        })
        
        // await new Promise((resolve) => setTimeout(resolve, 2000))
        
        if (json.data.journalsPage.data === null || json.data.journals.data.length === 0) notFound();

        const journalsPageTitle = json.data.journalsPage.data.attributes.navBarConfig?.navBarTitle
          ? json.data.journalsPage.data.attributes.navBarConfig.navBarTitle
          : json.data.journalsPage.data.attributes.title;
      
        const journal = JournalSinglePageT.parse(json.data.journals.data[0]);
      
        return { journalsPageTitle, journal };
    };

    const [ dataResult ] = await Promise.allSettled([ getJournalBySlug(params.locale, params.slug) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place={`Journal (${params.slug})`}
            notFound
            goBack
        />
    )

    return (
        <div className='w-full'>
            <Breadcrumbs data={[
                { title: dataResult.value.journalsPageTitle, slug: "journals" }, 
                { title: dataResult.value.journal.attributes.title, slug: params.slug }
            ]}/>

            <TypographyH1 className='font-semibold text-primary my-6 text-3xl'>
                {dataResult.value.journal.attributes.title}
            </TypographyH1>

            <Anchors data={dataResult.value.journal.attributes.content} />

            {dataResult.value.journal.attributes.content.map((item, index) => (
                <section id={item.link ? item.link : undefined} key={index}>
                    <DynamicZone item={item} searchParams={searchParams} />
                </section>
            ))}
        </div>
    )
}

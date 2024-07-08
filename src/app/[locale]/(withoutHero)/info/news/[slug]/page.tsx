import Anchors from '@/components/Anchors';
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ClientHydration } from '@/components/ClientHydration';
import ImageComp from '@/components/ImageComp';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import getMetadataNewsSingle from '@/lib/queries/metadata/info/getMetadataNewsSingle';
import { NewsSinglePageT } from '@/lib/types/pages';
import { formatDate } from '@/lib/utils';
import { CalendarDays, Clock3 } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ 
  params: { locale, slug }
}:  { 
  params: { locale: string, slug: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataNewsSingle(locale, slug) ]);

  if (dataResult.status === "rejected") return {}

  const metadata = dataResult.value

  return {
    title: metadata.title,
    openGraph: {
      title: metadata.title,
      images: metadata.image.data?.attributes.url,
      locale: locale,
    }
  }
}

export default async function NewsSinglePage({
  params,
  searchParams,
}: {
  params: { locale: string, slug: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getNewsBySlug = async (locale: string, slug: string) => {
    const query = /* GraphGL */ `
      query NewsBySlug($locale: I18NLocaleCode, $filters: NewFiltersInput) {
        info(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        newsPage(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        news(locale: $locale, filters: $filters) {
          data {
            attributes {
              title
              slug
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              text
              publishedAt
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
        info: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        newsPage: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        news: {
          data: NewsSinglePageT[]
        }
      }
    }>({ 
      query, 
      error: `Failed to fetch News: ${slug}`, 
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
      
    if (json.data.info.data === null || json.data.newsPage.data === null || json.data.news.data.length === 0) notFound();

    const infoTitle = json.data.info.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.info.data.attributes.navBarConfig.navBarTitle
      : json.data.info.data.attributes.title;

    const newsPageTitle = json.data.newsPage.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.newsPage.data.attributes.navBarConfig.navBarTitle
      : json.data.newsPage.data.attributes.title;
    
    const newsSingle = NewsSinglePageT.parse(json.data.news.data[0]);
    
    return { infoTitle, newsPageTitle, newsSingle };
  };

  const [ dataResult ] = await Promise.allSettled([ getNewsBySlug(params.locale, params.slug) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place={`News (${params.slug})`}
      notFound
      goBack
    />
  )

  const news = dataResult.value.newsSingle.attributes

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.infoTitle, slug: "info" }, 
        { title: dataResult.value.newsPageTitle, slug: "news" },
        { title: news.title, slug: params.slug }
      ]}/>

      <div className='mt-6'>
        <div className='lg:w-1/3 lg:float-right lg:ml-8'>
          <div className='relative aspect-video overflow-hidden rounded-3xl mb-3'>
            <ClientHydration fallback={<Skeleton className='w-full h-full'/>}>
              <ImageComp 
                src={news.image.data?.attributes.url}
                alt={news.title}
                fill
                sizes='(max-width: 1024px) 100vw, 50vw'
                className='object-cover'
              />
            </ClientHydration>
          </div>

          <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
                  <CalendarDays className='w-auto h-5' />
                  <p>{formatDate(news.publishedAt, params.locale)}</p>
              </div>
              <div className='flex items-center gap-1 dark:text-muted-foreground font-medium'>
                  <Clock3 className='w-auto h-5' />
                  <p>{news.publishedAt.getHours() + ":" + news.publishedAt.getMinutes()}</p>
              </div>
          </div>

          <Anchors data={news.content} className='mb-6 lg:flex hidden'/>
        </div>

        <div className=''>
          <TypographyH1 className='font-semibold text-primary lg:text-4xl sm:text-3xl text-2xl mb-3'>
            {news.title}
          </TypographyH1>

          <Anchors data={news.content} className='mb-6 lg:hidden'/>
          
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
          <BlocksRendererStrapi content={news.text} />
        </div>
      </div>

      <div className='w-full lg:float-left'>
        {news.content.map((item, index) => (
          <section id={item.link ? item.link : undefined} key={index}>
            <DynamicZone item={item} searchParams={searchParams} />
          </section>
        ))}
      </div>
    </div>
  )
}

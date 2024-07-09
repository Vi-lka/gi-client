import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { NewsPageT } from '@/lib/types/pages';
import { notFound } from 'next/navigation';
import React from 'react'


export default async function NewsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getNewsPage = async (locale: string) => {
    const query = /* GraphGL */ `
    query NewsPage($locale: I18NLocaleCode) {
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
          data: NewsPageT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch News Page",
      variables: {
        locale
      }
    })
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    if (json.data.info.data === null || json.data.newsPage.data === null) notFound();

    const infoTitle = json.data.info.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.info.data.attributes.navBarConfig.navBarTitle
      : json.data.info.data.attributes.title;

    const newsPage = NewsPageT.parse(json.data.newsPage.data);

    return { infoTitle, newsPage };
  };

  const [ dataResult ] = await Promise.allSettled([ getNewsPage(locale) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="News Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.newsPage.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.newsPage.attributes.navBarConfig.navBarTitle 
    : dataResult.value.newsPage.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.infoTitle, slug: "info" }, 
        { title: breadcrumbsTitle, slug: "news" }
      ]} />
    
      <TypographyH1 className='font-semibold text-primary my-6'>
        {dataResult.value.newsPage.attributes.title}
      </TypographyH1>
    
      <Anchors data={dataResult.value.newsPage.attributes.content} />
    
      {dataResult.value.newsPage.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}

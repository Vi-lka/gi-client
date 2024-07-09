import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import type { AdditionalPageSingleT } from '@/lib/types/pages';
import { AdditionalPagesT } from '@/lib/types/pages';
import {notFound} from 'next/navigation';
 
export default async function CatchAllPage({ 
  params,
  searchParams,
}: { 
  params: { 
    locale: string,
    slug: string[] 
  },
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const getAdditionalPage= async ({
    locale, 
    slug,
    connectedSlugs,
  }: {
    locale: string, 
    slug: string | undefined, 
    connectedSlugs: string[]
  }): Promise<AdditionalPageSingleT> => {

    if (!slug) notFound()

    const query = /* GraphGL */ `
      query AdditionalPages($filters: AdditionalPageFiltersInput, $locale: I18NLocaleCode) {
        additionalPages(filters: $filters, locale: $locale) {
          meta {
            pagination {
              total
            }
          }
          data {
            id
            attributes {
              slug
              title
              navBarConfig { navBarTitle }
              additional_pages {
                data {
                  attributes {
                    slug
                    title
                    navBarConfig { navBarTitle }
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
        additionalPages: AdditionalPagesT
      }
    }>({ 
      query, 
      error: `Failed to fetch Additional Page: ${slug}`,
      variables: {
        locale,
        filters: {
          slug: {
            eqi: slug
          },
          additional_pages: {
            slug: connectedSlugs.length > 0 ? 
            {
              in: connectedSlugs
            }
            : null
          }
        }
      }
    })
    
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    
    if (json.data.additionalPages.meta.pagination.total === 0 || json.data.additionalPages.data.length === 0) notFound();
  
    const additionalPages = AdditionalPagesT.parse(json.data.additionalPages);
  
    return additionalPages.data[0];
  };

  const lastSlug = params.slug.pop()
  const remainingSlugs = params.slug

  const [ dataResult ] = await Promise.allSettled([ 
    getAdditionalPage({
      locale: params.locale,
      slug: lastSlug,
      connectedSlugs: remainingSlugs
    }) 
  ]);
  if (dataResult.status === "rejected") { 
    if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") notFound()
    else return (
      <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Additional Page"
        notFound
        goBack
      />
    )
  }

  const connectedPages = dataResult.value.attributes.additional_pages.data.map(item => ({
    slug: item.attributes.slug,
    title: item.attributes.navBarConfig?.navBarTitle 
      ? item.attributes.navBarConfig.navBarTitle
      : item.attributes.title
  }))


  const breadcrumbsTitle = dataResult.value.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.attributes.navBarConfig.navBarTitle 
    : dataResult.value.attributes.title

  const compareArrays = (a: string[], b: string[]) => (
    a.length === b.length &&
    a.every((element, index) => element === b[index])
  )

  if (!compareArrays(remainingSlugs, connectedPages.map(item => item.slug))) notFound()

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        ...connectedPages,
        { title: breadcrumbsTitle, slug: dataResult.value.attributes.slug }
      ]}/>

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
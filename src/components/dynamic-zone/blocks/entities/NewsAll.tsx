import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { Skeleton } from '@/components/ui/skeleton';
import { getDictionary } from '@/lib/getDictionary';
import { getNews } from '@/lib/queries/news';
import type { CollectionAllCompT } from '@/lib/types/components';
import dynamic from 'next/dynamic';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'
import NewsItem from '../entities-cards/NewsItem';
import NewsLoading from '@/components/loadings/NewsLoading';
import { CarouselItem } from '@/components/ui/carousel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SliderLoading from '@/components/loadings/SliderLoading';

const SearchField = dynamic(
  () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)

const CarouselComp = dynamic(
  () => import('@/components/CarouselComp'), {loading: () => <SliderLoading />}
)

const DEFAULT_PAGE_SIZE = 12;

export default async function NewsAll({
  searchParams,
  data,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  data: CollectionAllCompT,
}) {
  const headersList = headers();
  const locale = headersList.get('x-locale') || "";

  const search = searchParams["search_news"] as string | undefined;
  const page = searchParams["page_news"] ?? "1";
  const pageSize = searchParams["per_news"] ?? DEFAULT_PAGE_SIZE;

  const dict = await getDictionary(locale)

  return (
    <>
      {data.showSearch && (
        <div className='w-full'>
          <SearchField placeholder={dict.Inputs.search} param='search_news' className='mb-3' />
        </div>
      )}
      <Suspense 
        key={`search_news=${search}&page_news=${page}&per_news=${pageSize}`} 
        fallback={<NewsLoading />}
      >
        <NewsAllContent locale={locale} dict={dict} searchParams={searchParams} config={data.newsConfig} />
      </Suspense>
    </>
  )
}

async function NewsAllContent({
  locale,
  dict,
  searchParams,
  config
}: {
  locale: string,
  dict: Dictionary,
  searchParams: { [key: string]: string | string[] | undefined };
  config: {
    count: number,
    showGoToAllButton: boolean
  } | null
}) {

  const search = searchParams["search_news"] as string | undefined;
  const page = searchParams["page_news"] ?? "1";
  const pageSize = (config && config.count > 0) 
    ? config.count
    : searchParams["per_news"] ?? DEFAULT_PAGE_SIZE;

  const [ dataResult ] = await Promise.allSettled([ 
    getNews({ 
      locale,
      search, 
      page: Number(page), 
      pageSize: Number(pageSize),
    }) 
  ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler
      error={dataResult.reason as unknown}
      place="News"
      notFound
      goBack={false}
    />
  )

  return (
    <>
      {config && (config.count > 0) 
        ? (
          <>
            <CarouselComp className='lg:-ml-8 -ml-4'>
              {dataResult.value.data.map(item => (
                <CarouselItem key={"news" + item.id} className='lg:basis-1/3 sm:basis-1/2 lg:pl-8 pl-4'>
                  <NewsItem locale={locale} item={item} buttonTitle={dict.Buttons.more} />
                </CarouselItem>
              ))}
            </CarouselComp>
            {config.showGoToAllButton && (
              <Link locale={locale} href={"/info/news"} className='flex w-fit mx-auto mt-6'>
                <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                  {dict.Buttons.allNews}
                </Button>
              </Link>
            )}
          </>
        )
        : (
          <>
            <div key={Math.random()} id="news" className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-fr lg:gap-8 gap-6">
              {dataResult.value.data.map(item => (
                <NewsItem key={"news" + item.id} locale={locale} item={item} buttonTitle={dict.Buttons.more} /> 
              ))}
            </div>
            <div className="mt-6">
              <PaginationControls
                length={dataResult.value.meta.pagination.total}
                defaultPageSize={DEFAULT_PAGE_SIZE}
                scrollToId='news'
                pageParam='page_news'
                perParam='per_news'
              />
            </div>
          </>
        )
      }
    </>
  )
}

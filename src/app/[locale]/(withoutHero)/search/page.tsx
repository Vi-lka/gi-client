import Breadcrumbs from '@/components/Breadcrumbs';
import ErrorHandler from '@/components/errors/ErrorHandler';
import SearchField from '@/components/filters/SearchField';
import PaginationControls from '@/components/PaginationControls';
import { getDictionary } from '@/lib/getDictionary';
import { getSearchAll } from '@/lib/queries/search-all';
import React, { Suspense } from 'react'

const DEFAULT_PAGE_SIZE = 10;

export default async function SearchPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary(locale)
  const search_all = searchParams["search_all"] as string | undefined
  const page = searchParams["page"] ?? "1";
  const pageSize = searchParams["per"] ?? DEFAULT_PAGE_SIZE;

  return (
    <div className='w-full'>
      <Breadcrumbs data={[{ title: dict.Inputs.search, slug: "search" }]} />

      <section className='my-6'>
        <SearchField defaultValue={search_all} placeholder={dict.Inputs.search} param='search_all' debouncedDelay={600} className='w-full mb-6' />

        <Suspense 
          key={`search_all=${search_all}&page=${page}&per=${pageSize}`} 
          fallback={"Loading..."}
        >
          <SearchContent locale={locale} dict={dict} searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  )
}

async function SearchContent({
  locale,
  dict,
  searchParams,
}: {
  locale: string,
  dict: Dictionary,
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search_all = searchParams["search_all"] as string | undefined
  const page = searchParams["page"] ?? "1";
  const pageSize = searchParams["per"] ?? DEFAULT_PAGE_SIZE;

  const [ dataResult ] = await Promise.allSettled([ 
    getSearchAll({ 
      locale,
      search_all, 
      page: Number(page), 
      pageSize: Number(pageSize),
    }) 
  ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler
      error={dataResult.reason as unknown}
      place={dict.Inputs.search}
      notFound
      goBack={false}
    />
  )

  return (
    <>
      <div key={`search_all=${search_all}&page=${page}&per=${pageSize}`} id="search" className=''>
        SearchContent
      </div>
      <div className="mt-6">
        <PaginationControls
          length={dataResult.value.total}
          defaultPageSize={DEFAULT_PAGE_SIZE}
          pageParam='page'
          perParam='per'
          showMore
        />
      </div>
    </>
  )
}
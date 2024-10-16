import Breadcrumbs from '@/components/Breadcrumbs';
import ErrorHandler from '@/components/errors/ErrorHandler';
import SearchField from '@/components/filters/SearchField';
import PaginationControls from '@/components/PaginationControls';
import { getDictionary } from '@/lib/getDictionary';
import { getSearchAll } from '@/lib/queries/search-all';
import React, { Suspense } from 'react'
import PageCard from './cards/entities/PageCard';
import AdditionalPageCard from './cards/entities/AdditionalPageCard';
import SingleEntity from './cards/entities/SingleEntity';
import MasonryGrid from '@/components/ui/masonry/MasonryGrid';
import { ClientHydration } from '@/components/ClientHydration';

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

  if (!search_all || search_all.length < 2) return dict.Error.zod.min2symbols;

  return (
    <>
      <div key={`search_all=${search_all}&page=${page}&per=${pageSize}`} id="search">
        <ClientHydration fallback={"Loading..."}>
          <MasonryGrid
            breakpointCols={{
              1024: 2,
              768: 1
            }}
          >
            {dataResult.value.data.map((item, index) => {
              switch (item.__typename) {
                case "MainPageEntity":
                case "DpoEntity":
                case "EducationPageEntity":
                case "EmployeesPageEntity":
                case "EntrancePageEntity":
                case "EventsPageEntity":
                case "InfoEntity":
                case "JournalsPageEntity":
                case "NewsPageEntity":
                case "ProjectsPageEntity":
                case "StructureEntity":
                  return <PageCard key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} />;
                case "AdditionalPageEntity":
                  return <AdditionalPageCard key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} />;
                case "EducationalProgramEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref="/admission/" />;
                case "EduEducationalProgramEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/education/programs/' />;
                case "DpoCourseEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/dpo/' />;
                case "DepartmentEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/structure/' />;
                case "EmployeeEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/structure/employees/' />;
                case "EventEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/info/events/' />;
                case "NewEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/info/news/' />;
                case "ProjectEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/projects/' />;
                case "JournalEntity":
                  return <SingleEntity key={index} locale={locale} dict={dict} data={item} searchTerm={search_all} parentHref='/journals/' />;
              
                default:
                  return null;
              }
            })}
          </MasonryGrid>
        </ClientHydration>
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
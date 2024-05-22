import ErrorHandler from '@/components/errors/ErrorHandler';
import React, { Suspense } from 'react'
import PaginationControls from '@/components/PaginationControls';
import { headers } from 'next/headers';
import { getDictionary } from '@/lib/getDictionary';
import DpoCoursesItem from '../entities-cards/DpoCoursesItem';
import { getDpoCourses } from '@/lib/queries/dpo-courses';
import type { CollectionAllCompT } from '@/lib/types/components';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import DpoCoursesLoading from '@/components/loadings/DpoCoursesLoading';

const SearchField = dynamic(
    () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)
const DepartmentsFilter = dynamic(
    () => import('@/components/filters/entities/DepartmentsFilter'), {loading: () => <Skeleton className='w-full h-10' />}
)

const DEFAULT_PAGE_SIZE = 12;

export default async function DpoCoursesAll({
    searchParams,
    data,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    data: CollectionAllCompT,
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const search = searchParams["search_dpo"] as string | undefined;
    const page = searchParams["page_dpo"] ?? "1";
    const pageSize = searchParams["per_dpo"] ?? DEFAULT_PAGE_SIZE;
    const departmentsParam = searchParams["departments"] as string | undefined;

    const dict = await getDictionary(locale)

    return (
        <>
            {data.showSearch && (
                <div className='w-full'>
                    <SearchField placeholder={dict.Inputs.search} param='search_dpo' className='mb-3' />
                </div>
            )}
            {data.showFilters && (
                <div className='mb-6'>
                    <DepartmentsFilter searchParams={searchParams} />
                </div>
            )}
            <Suspense 
                key={`search_dpo=${search}&page_dpo=${page}&per_dpo=${pageSize}&departments=${departmentsParam}`} 
                fallback={<DpoCoursesLoading />}
            >
                <DpoCoursesAllContent locale={locale} slug={slug} dict={dict} searchParams={searchParams} connected={data.connected} />
            </Suspense>
        </>
    )
}

async function DpoCoursesAllContent({
    locale,
    slug,
    dict,
    searchParams,
    connected,
}: {
    locale: string,
    slug: string | undefined,
    dict: Dictionary,
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
}) {
    const search = searchParams["search_dpo"] as string | undefined;
    const page = searchParams["page_dpo"] ?? "1";
    const pageSize = searchParams["per_dpo"] ?? DEFAULT_PAGE_SIZE;
    const departmentsParam = searchParams["departments"] as string | undefined;

    const departments = departmentsParam?.split("_or_")

    const [ dataResult ] = await Promise.allSettled([ 
        getDpoCourses({ 
            locale,
            search, 
            page: Number(page), 
            pageSize: Number(pageSize),
            filterBy: connected ? slug : undefined,
            departments
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Additional Courses"
            notFound
            goBack={false}
        />
    )

    return (
        <>
            <div key={`search_dpo=${search}&page_dpo=${page}&per_dpo=${pageSize}&departments=${departmentsParam}`} id="dpo-courses" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
                {dataResult.value.data.map(item => (
                    <DpoCoursesItem key={"dpo-course" + item.id} locale={locale} item={item} dict={dict} /> 
                ))}
            </div>
            <div className="mt-6">
                <PaginationControls
                    length={dataResult.value.meta.pagination.total}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                    scrollToId='dpo-courses'
                    pageParam='page_dpo'
                    perParam='per_dpo'
                />
            </div>
        </>
    )
}

import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { getDepartments } from '@/lib/queries/departments';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'
import type { CollectionAllCompT } from '@/lib/types/components';
import dynamic from 'next/dynamic';
import BentoLoading from '@/components/loadings/BentoLoading';
import DepartmentLoading from '@/components/loadings/items/DepartmentLoading';
import { Skeleton } from '@/components/ui/skeleton';
import DepartmentsLoading from '@/components/loadings/DepartmentsLoading';

const DepartmentsBento = dynamic(
    () => import('../entities-cards/bento/DepartmentsBento'), {loading: () => <BentoLoading />}
)
const DepartmentsItem = dynamic(
    () => import('../entities-cards/DepartmentsItem'), {loading: () => <DepartmentLoading />}
)

const SearchField = dynamic(
    () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)

const DEFAULT_PAGE_SIZE = 10;

export default async function DepartmentsAll({
    searchParams,
    data
}: {
    searchParams: { [key: string]: string | string[] | undefined },
    data: CollectionAllCompT,
}){
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const search = searchParams["search_departments"] as string | undefined;
    const page = searchParams["page_departments"] ?? "1";
    const pageSize = searchParams["per_departments"] ?? DEFAULT_PAGE_SIZE;

    const dict = await getDictionary(locale)

    return (
        <>
            {data.showSearch && (
                <div className='w-full'>
                    <SearchField placeholder={dict.Inputs.search} param='search_departments' className='mb-6' />
                </div>
            )}
            <Suspense 
                key={`search_departments=${search}&page_departments=${page}&per_departments=${pageSize}`} 
                fallback={data.departmentsConfig?.view === "bento" ? <BentoLoading /> : <DepartmentsLoading />}
            >
                <DepartmentsAllContent 
                    locale={locale} 
                    slug={slug} 
                    dict={dict} 
                    data={data}
                    searchParams={searchParams} 
                />
            </Suspense>
        </>
    )
}


async function DepartmentsAllContent({
    locale,
    slug,
    dict,
    data,
    searchParams,
}: {
    locale: string,
    slug: string | undefined,
    dict: Dictionary,
    data: CollectionAllCompT,
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const search = searchParams["search_departments"] as string | undefined;
    const page = searchParams["page_departments"] ?? "1";
    const pageSize = searchParams["per_departments"] ?? DEFAULT_PAGE_SIZE;

    const [ dataResult ] = await Promise.allSettled([ 
        getDepartments({ 
            locale,
            search, 
            page: Number(page), 
            pageSize: Number(pageSize),
            category: data.departmentsConfig?.category,
            typeId: data.departmentsConfig?.type.data?.id,
            filterBy: data.connected ? slug : undefined
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Departments"
            notFound
            goBack={false}
        />
    )

    return (
        <>
            {data.departmentsConfig?.view === "bento"
                ? (
                    <div key={`search_departments=${search}&page_departments=${page}&per_departments=${pageSize}`} id="departments">
                        <DepartmentsBento locale={locale} departments={dataResult.value} />
                    </div>
                )
                : (
                    <div key={`search_departments=${search}&page_departments=${page}&per_departments=${pageSize}`} id="departments" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
                        {dataResult.value.data.map(item => (
                            <DepartmentsItem key={"department" + item.id} locale={locale} item={item} dict={dict} /> 
                        ))}
                    </div>
                )
            }
            <div className={data.departmentsConfig?.view === "bento" ? "mt-8" : "mt-6"}>
                <PaginationControls
                    length={dataResult.value.meta.pagination.total}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                    scrollToId='departments'
                    pageParam='page_departments'
                    perParam='per_departments'
                    showMore={false}
                />
            </div>
        </>
    )
}
import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { headers } from 'next/headers';
import React from 'react'
import EmployeesItem from '../entities-cards/EmployeesItem';
import { getEmployees } from '@/lib/queries/employees';
import type { CollectionAllCompT } from '@/lib/types/components';
import { getDictionary } from '@/lib/getDictionary';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const SearchField = dynamic(
    () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)
const DepartmentsFilter = dynamic(
    () => import('@/components/filters/entities/DepartmentsFilter'), {loading: () => <Skeleton className='w-full h-10' />}
)
const HashtagsFilter = dynamic(
    () => import('@/components/filters/entities/HashtagsFilter'), {loading: () => <Skeleton className='w-full h-10' />}
)

const DEFAULT_PAGE_SIZE = 12;

export default async function EmployeesAll({
    searchParams,
    data
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    data: CollectionAllCompT,
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const dict = await getDictionary(locale)

    return (
        <>
            {data.showSearch && (
                <div className='w-full'>
                    <SearchField placeholder={dict.Inputs.search} param='search_employees' className='mb-3' />
                </div>
            )}
            {data.showFilters && (
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-3 mb-6'>
                    <DepartmentsFilter searchParams={searchParams} />
                    <HashtagsFilter searchParams={searchParams} />
                </div>
            )}
            <EmployeesAllContent locale={locale} slug={slug} searchParams={searchParams} connected={data.connected} config={data.employeesConfig} />
        </>
    )
}

async function EmployeesAllContent({
    locale,
    slug,
    searchParams,
    connected,
    config
}: {
    locale: string;
    slug: string | undefined;
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
    config: {
        showContacts: boolean,
        showHashtags: boolean
    } | null
}) {
    const search = searchParams[`search_employees`] as string | undefined;
    const page = searchParams["page_employees"] ?? "1";
    const pageSize = searchParams["per_employees"] ?? DEFAULT_PAGE_SIZE;
    const departmentsParam = searchParams["departments"] as string | undefined;
    const hashtagsParam = searchParams["hashtags"] as string | undefined;

    const departments = departmentsParam?.split("_or_")
    const hashtags = hashtagsParam?.split("_or_")

    const [ dataResult ] = await Promise.allSettled([ 
        getEmployees({
            locale,
            search, 
            page: Number(page), 
            pageSize: Number(pageSize),
            filterBy: connected ? slug : undefined,
            departments,
            hashtags
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Employees"
            notFound
            goBack={false}
        />
    )


    return (
        <>
            <div key={Math.random()} id="employees" className="grid md:grid-cols-2 grid-cols-1 auto-rows-auto lg:gap-8 gap-6">
                {dataResult.value.data.map(employee => (
                    <EmployeesItem 
                        key={"employee" + employee.id} 
                        locale={locale}
                        config={config}
                        employee={employee}
                        connected={connected}
                        slug={slug}
                    />
                ))}
            </div>
            <div className="mt-6">
                <PaginationControls
                    length={dataResult.value.meta.pagination.total}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                    scrollToId='employees'
                    pageParam='page_employees'
                    perParam='per_employees'
                />
            </div>
        </>
    )
}

import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { headers } from 'next/headers';
import React from 'react'
import EmployeesItem from '../entities-cards/EmployeesItem';
import { getEmployees } from '@/lib/queries/employees';
import type { CollectionAllCompT } from '@/lib/types/components';
import SearchField from '@/components/filters/SearchField';
import { getDictionary } from '@/lib/getDictionary';
import DepartmentsFilter from '@/components/filters/entities/DepartmentsFilter';

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
                <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-6 mb-6'>
                    <div className='lg:order-1 order-2'>
                        <DepartmentsFilter searchParams={searchParams} />
                    </div>
                    <div className='lg:order-2 order-1'>

                    </div>
                </div>
            )}
            <EmployeesAllContent locale={locale} slug={slug} searchParams={searchParams} connected={data.connected} />
        </>
    )
}

async function EmployeesAllContent({
    locale,
    slug,
    searchParams,
    connected,
}: {
    locale: string,
    slug: string | undefined,
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null
}) {
    const search = searchParams[`search_employees`] as string | undefined;
    const page = searchParams["page_employees"] ?? "1";
    const pageSize = searchParams["per_employees"] ?? DEFAULT_PAGE_SIZE;
    const departmentsParam = searchParams["departments"] as string | undefined;

    const departments = departmentsParam?.split("_or_")

    console.log(departments)

    const [ dataResult ] = await Promise.allSettled([ 
        getEmployees({
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

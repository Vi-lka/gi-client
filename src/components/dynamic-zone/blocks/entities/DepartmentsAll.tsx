import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { getDepartments } from '@/lib/queries/departments';
import { headers } from 'next/headers';
import React from 'react'
import DepartmentsItem from '../entities-cards/DepartmentsItem';

const DEFAULT_PAGE_SIZE = 16;

export default async function DepartmentsAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(locale)

    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;
    const page = searchParams["page_departments"] ?? "1";
    const pageSize = searchParams["per_departments"] ?? DEFAULT_PAGE_SIZE;


    const [ dataResult ] = await Promise.allSettled([ 
        getDepartments({ 
            locale,
            sort, 
            search, 
            page: Number(page), 
            pageSize: Number(pageSize),
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
            <div id="departments" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
                {dataResult.value.data.map(item => (
                    <DepartmentsItem key={"department" + item.id} locale={locale} item={item} dict={dict} /> 
                ))}
            </div>
            <div className="mt-6">
                <PaginationControls
                    length={dataResult.value.meta.pagination.total}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                    scrollToId='departments'
                    pageParam='page_departments'
                    perParam='per_departments'
                />
            </div>
        </>
    )
}

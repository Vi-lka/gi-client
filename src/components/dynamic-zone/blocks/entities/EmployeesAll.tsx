import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { getEmployees } from '@/lib/queries';
import { headers } from 'next/headers';
import React from 'react'
import EmployeesItem from '../entities-cards/EmployeesItem';

const DEFAULT_PAGE_SIZE = 12;

export default async function EmployeesAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;
    const page = searchParams["page_employees"] ?? "1";
    const pageSize = searchParams["per_employees"] ?? DEFAULT_PAGE_SIZE;


    const [ dataResult ] = await Promise.allSettled([ 
        getEmployees({ 
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
            place="Employees"
            notFound
            goBack={false}
        />
    )

    return (
        <>
            <div id="employees" className="grid md:grid-cols-2 grid-cols-1 auto-rows-auto lg:gap-8 gap-6">
                {dataResult.value.data.map(employee => (
                    <EmployeesItem key={"employee" + employee.id} employee={employee} />
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
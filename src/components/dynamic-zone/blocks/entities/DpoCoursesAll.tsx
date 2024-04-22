import ErrorHandler from '@/components/errors/ErrorHandler';
import React from 'react'
import PaginationControls from '@/components/PaginationControls';
import { headers } from 'next/headers';
import { getDictionary } from '@/lib/getDictionary';
import DpoCoursesItem from '../entities-cards/DpoCoursesItem';
import { getDpoCourses } from '@/lib/queries/dpo-courses';

const DEFAULT_PAGE_SIZE = 12;

export default async function DpoCoursesAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(locale)

    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;
    const page = searchParams["page_dpo"] ?? "1";
    const pageSize = searchParams["per_dpo"] ?? DEFAULT_PAGE_SIZE;


    const [ dataResult ] = await Promise.allSettled([ 
        getDpoCourses({ 
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
            place="Additional Courses"
            notFound
            goBack={false}
        />
    )

    return (
        <>
            <div id="dpo-courses" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
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

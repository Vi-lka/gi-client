import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { getDepartments } from '@/lib/queries/departments';
import { headers } from 'next/headers';
import React from 'react'
import DepartmentsItem from '../../entities-cards/DepartmentsItem';
import type { CollectionAllViewEnum } from '@/lib/types/components';
import DepartmentsBento from '../../entities-cards/bento/DepartmentsBento';
import type { StructureCategoryEnum } from '@/lib/types/entities';

const DEFAULT_PAGE_SIZE = 10;

export default async function DepartmentsAll({
    category,
    typeId,
    view,
    searchParams,
}: {
    category: StructureCategoryEnum | null,
    typeId: string | undefined,
    view: CollectionAllViewEnum | null;
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
            category,
            typeId
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
            {view === "bento" 
                ? (
                    <DepartmentsBento locale={locale} departments={dataResult.value} />
                )
                : (
                    <div id="departments" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
                        {dataResult.value.data.map(item => (
                            <DepartmentsItem key={"department" + item.id} locale={locale} item={item} dict={dict} /> 
                        ))}
                    </div>
                )
            }
            <div className={view === "bento" ? "mt-8" : "mt-6"}>
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
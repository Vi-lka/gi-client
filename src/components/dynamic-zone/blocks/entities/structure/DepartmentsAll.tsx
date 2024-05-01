import PaginationControls from '@/components/PaginationControls';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { getDepartments } from '@/lib/queries/departments';
import { headers } from 'next/headers';
import React from 'react'
import type { CollectionAllViewEnum } from '@/lib/types/components';
import type { StructureCategoryEnum } from '@/lib/types/entities';
import dynamic from 'next/dynamic';
import BentoLoading from '@/components/loadings/BentoLoading';
import DepartmentLoading from '@/components/loadings/items/DepartmentLoading';

const DepartmentsBento = dynamic(
    () => import('../../entities-cards/bento/DepartmentsBento'), {loading: () => <BentoLoading />}
)
const DepartmentsItem = dynamic(
    () => import('../../entities-cards/DepartmentsItem'), {loading: () => <DepartmentLoading />}
)

const DEFAULT_PAGE_SIZE = 10;

export default async function DepartmentsAll({
    category,
    typeId,
    view,
    searchParams,
    connected,
}: {
    category: StructureCategoryEnum | null,
    typeId: string | undefined,
    view: CollectionAllViewEnum | null;
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

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
            typeId,
            filterBy: connected ? slug : undefined
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
                    <div key={Math.random()} id="departments">
                        <DepartmentsBento locale={locale} departments={dataResult.value} />
                    </div>
                )
                : (
                    <div key={Math.random()} id="departments" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
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
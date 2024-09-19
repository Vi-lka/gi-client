import ErrorHandler from '@/components/errors/ErrorHandler';
import React, { Suspense } from 'react'
import PaginationControls from '@/components/PaginationControls';
import { headers } from 'next/headers';
import { getDictionary } from '@/lib/getDictionary';
import ProjectsItem from '../entities-cards/ProjectsItem';
import { getProjects } from '@/lib/queries/projects';
import type { CollectionAllCompT } from '@/lib/types/components';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import DpoCoursesLoading from '@/components/loadings/DpoCoursesLoading';

const SearchField = dynamic(
    () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)

const DEFAULT_PAGE_SIZE = 12;

export default async function ProjectsAll({
    searchParams,
    data,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    data: CollectionAllCompT,
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const search = searchParams["search_projects"] as string | undefined;
    const page = searchParams["page_projects"] ?? "1";
    const pageSize = searchParams["per_projects"] ?? DEFAULT_PAGE_SIZE;

    const dict = await getDictionary(locale)

    return (
        <>
            {data.showSearch && (
                <div className='w-full'>
                    <SearchField placeholder={dict.Inputs.search} param='search_projects' className='mb-3' />
                </div>
            )}
            <Suspense 
                key={`search_projects=${search}&page_projects=${page}&per_projects=${pageSize}`} 
                fallback={<DpoCoursesLoading />}
            >
                <ProjectsAllContent locale={locale} slug={slug} dict={dict} searchParams={searchParams} connected={data.connected} />
            </Suspense>
        </>
    )
}

async function ProjectsAllContent({
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
    const search = searchParams["search_projects"] as string | undefined;
    const page = searchParams["page_projects"] ?? "1";
    const pageSize = searchParams["per_projects"] ?? DEFAULT_PAGE_SIZE;

    const [ dataResult ] = await Promise.allSettled([ 
        getProjects({ 
            locale,
            search, 
            page: Number(page), 
            pageSize: Number(pageSize),
            filterBy: connected ? slug : undefined,
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Projects"
            notFound
            goBack={false}
        />
    )

    return (
        <>
            <div key={`search_projects=${search}&page_projects=${page}&per_projects=${pageSize}`} id="projects" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
                {dataResult.value.data.map(item => (
                    <ProjectsItem key={"project" + item.id} locale={locale} item={item} dict={dict} /> 
                ))}
            </div>
            <div className="mt-6">
                <PaginationControls
                    length={dataResult.value.meta.pagination.total}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                    scrollToId='projects'
                    pageParam='page_projects'
                    perParam='per_projects'
                />
            </div>
        </>
    )
}

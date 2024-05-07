import ErrorHandler from '@/components/errors/ErrorHandler';
import React, { Suspense } from 'react';
import { headers } from 'next/headers';
import { ClientHydration } from '@/components/ClientHydration';
import SliderGraduatesLoading from '@/components/loadings/SliderGraduatesLoading';
import { getGraduates } from '@/lib/queries/graduates';
import SliderSplit from '../sliders/SliderSplit';
import type { CollectionAllCompT } from '@/lib/types/components';
import { getDictionary } from '@/lib/getDictionary';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const SearchField = dynamic(
    () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)

export default async function GraduatesAll({
    searchParams,
    data,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    data: CollectionAllCompT,
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const search = searchParams["search_graduates"] as string | undefined;

    const dict = await getDictionary(locale)

    return (
        <>
            {data.showSearch && (
                <div className='w-full'>
                    <SearchField placeholder={dict.Inputs.search} param='search_graduates' className='mb-6' />
                </div>
            )}
            <Suspense 
                key={`search=${search}`} 
                fallback={<SliderGraduatesLoading />}
            >
                <GraduatesAllContent locale={locale} slug={slug} searchParams={searchParams} connected={data.connected} />
            </Suspense>
        </>
    )
}


async function GraduatesAllContent({
    locale,
    slug,
    searchParams,
    connected,
}: {
    locale: string,
    slug: string | undefined,
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
}) {
    const search = searchParams["search_graduates"] as string | undefined;

    const [ dataResult ] = await Promise.allSettled([ 
        getGraduates({
            locale, 
            search,
            filterBy: connected ? slug : undefined
        })
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Graduates All"
            notFound
            goBack={false}
        />
    )

    if (!search && dataResult.value.meta.pagination.total === 0) return null

    return (
        <ClientHydration fallback={<SliderGraduatesLoading />}>
            <SliderSplit data={dataResult.value.data} />
        </ClientHydration>
    )
}

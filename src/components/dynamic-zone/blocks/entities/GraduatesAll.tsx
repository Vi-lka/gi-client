import ErrorHandler from '@/components/errors/ErrorHandler';
import React from 'react';
import { headers } from 'next/headers';
import { ClientHydration } from '@/components/ClientHydration';
import SliderGraduatesLoading from '@/components/loadings/SliderGraduatesLoading';
import { getGraduates } from '@/lib/queries/graduates';
import SliderSplit from '../sliders/SliderSplit';

export default async function GraduatesAll({
    searchParams,
    connected,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const search = searchParams["search"] as string | undefined;

    const [ dataResult ] = await Promise.allSettled([ getGraduates({ 
        locale, 
        search,
        filterBy: connected ? slug : undefined
    }) ]);
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

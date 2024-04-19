import ErrorHandler from '@/components/errors/ErrorHandler';
import React from 'react';
import { headers } from 'next/headers';
import { ClientHydration } from '@/components/ClientHydration';
import SplitSlider from '../sliders/SplitSlider';
import SplitSliderLoading from '@/components/loadings/SplitSliderLoading';
import { getGraduates } from '@/lib/queries/graduates';

export default async function GraduatesAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const search = searchParams["search"] as string | undefined;

    const [ dataResult ] = await Promise.allSettled([ getGraduates({ locale, search }) ]);
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
        <ClientHydration fallback={<SplitSliderLoading />}>
            <SplitSlider data={dataResult.value.data} />
        </ClientHydration>
    )
}

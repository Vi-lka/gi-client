import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH2 } from '@/components/typography';
import { getEntranceInfo } from '@/lib/queries';
import React from 'react'

export default async function EntranceInfo({ id }: { id?: string }) {

    const [ dataResult ] = await Promise.allSettled([ getEntranceInfo() ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Entrance info" 
            notFound={false}
        />
    );

    return (
        <section id={id} className='lg:pt-28 pt-20'>
            <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                {dataResult.value.attributes.mainInfoLinkName}
            </TypographyH2>
            {dataResult.value.attributes.mainInfoContent.map((item, index) => (
                <DynamicZone key={index} item={item} />
            ))}
        </section>
    )
}

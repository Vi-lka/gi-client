import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { getHashtags } from '@/lib/queries/hashtags';
import { headers } from 'next/headers';
import React from 'react'
import { Select } from '../Select';

export default async function HashtagsFilter({
    // searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(locale)

    const [ dataResult ] = await Promise.allSettled([ 
        getHashtags({ 
            locale
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Hashtags Filter"
            notFound={false}
        />
    )

    const values = dataResult.value.data.map(item => (
        {value: item.id, label: item.attributes.title}
    ))

    return (
        <Select isMulti values={values} param='hashtags' placeholder={dict.Inputs.hashtags} placeholderLength={4} align="center" className='max-w-none'/>
    )
}

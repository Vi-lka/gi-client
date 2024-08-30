import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { getGroups } from '@/lib/queries/groups';
import { headers } from 'next/headers';
import React from 'react'
import { Select } from '../Select';
import type { GroupCourseEnum } from '@/lib/types/entities';

export default async function GroupFilter({
    searchParams,
    connected,
    slug
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
    slug?: string;
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(locale)

    const course = searchParams["course"] as GroupCourseEnum | undefined;

    const [ dataResult ] = await Promise.allSettled([ 
        getGroups({
            locale,
            sort: "title:asc",
            course,
            filterBy: connected ? slug : undefined
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Group Filter"
            notFound={false}
        />
    )

    const values = dataResult.value.data.map(item => (
        {value: item.id, label: item.attributes.title}
    ))

    return (
        <Select isMulti={false} values={values} param='group' placeholder={dict.Inputs.group} align="center" className='max-w-none'/>
    )
}

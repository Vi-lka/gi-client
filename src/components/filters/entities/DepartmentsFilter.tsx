import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { getDepartments } from '@/lib/queries/departments';
import { headers } from 'next/headers';
import React from 'react'
import { Select } from '../Select';

export default async function DepartmentsFilter({
    // searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(locale)

    const [ dataResult ] = await Promise.allSettled([ 
        getDepartments({ 
            locale
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Departments Filter"
            notFound={false}
        />
    )

    const values = dataResult.value.data.map(item => (
        {value: item.attributes.slug, label: item.attributes.title}
    ))

    return (
        <Select isMulti values={values} param='departments' placeholder={dict.Inputs.departments} className='max-w-none'/>
    )
}

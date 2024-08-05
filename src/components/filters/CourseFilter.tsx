import { getDictionary } from '@/lib/getDictionary';
import { headers } from 'next/headers';
import React from 'react'
import { Select } from './Select';
import { CourseEnumValues } from '@/lib/types/entities';
import getCourseName from '@/lib/getCourseName';

export default async function CourseFilter() {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(locale)

    const values = CourseEnumValues.map(item => (
        {value: item, label: getCourseName(item, dict)}
    ))

    return (
        <Select isMulti={false} values={values} param='course' placeholder={dict.Inputs.course.title} align="center" className='max-w-none'/>
    )
}

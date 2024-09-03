import ErrorHandler from '@/components/errors/ErrorHandler'
import CourseFilter from '@/components/filters/CourseFilter'
import GroupFilter from '@/components/filters/entities/GroupFilter'
import { TypographyH2 } from '@/components/typography'
import { getGroupById } from '@/lib/queries/groups'
import type { GroupCalendarCompT } from '@/lib/types/components'
import type { GroupCourseEnum } from '@/lib/types/entities'
import { cn } from '@/lib/utils'
import { headers } from 'next/headers'
import React, { Suspense } from 'react'
import { getGroupCalendarData, getGroupCalendarDates } from './getCalendarData'
import { ClientHydration } from '@/components/ClientHydration'
import CalendarSegment from './CalendarSegment'
import GroupCalendarLoading from '@/components/loadings/GroupCalendarLoading'
import { getDictionary } from '@/lib/getDictionary'

export default function GroupCalendar({
    data,
    searchParams,
    headingBig,
    className
}: {
    data: GroupCalendarCompT,
    searchParams: { [key: string]: string | string[] | undefined },
    headingBig?: boolean,
    className?: string
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const course = searchParams["course"] as GroupCourseEnum | undefined;
    const group = searchParams["group"] as string | undefined;

    return (
        <div className={cn("w-full", className)}>
            {data.title && (
                <TypographyH2 
                    className={cn(
                        'font-semibold text-primary mb-6 border-none',
                        headingBig ? "text-4xl lg:text-5xl" : ""
                    )}
                >
                    {data.title}
                </TypographyH2>
            )}
            <div className='flex sm:flex-row flex-col gap-3 items-center justify-between mb-3'>
                {data.connected
                    ? null
                    : (
                        <div className='sm:w-1/2 w-full'>
                            <CourseFilter disabled={(!!group && group.length > 0)} />
                        </div>
                    )
                }
                <div className={data.connected ? 'w-full' : 'sm:w-1/2 w-full'}>
                    <GroupFilter searchParams={searchParams} connected={data.connected} slug={slug} />
                </div>
            </div>
            <div className='w-full mb-12'>
                <Suspense 
                    key={`course=${course}&group=${group}`} 
                    fallback={<GroupCalendarLoading/>}
                >
                  <GroupCalendarContent
                    locale={locale}
                    searchParams={searchParams}
                  />
                </Suspense>
            </div>
        </div>
    )
}

async function GroupCalendarContent({
    locale,
    searchParams,
}: {
    locale: string,
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const dict = await getDictionary(locale)

    const group = searchParams["group"] as string | undefined;

    if (!group) return (
        <div className='w-full mt-6'>
            <p className='text-center font-semibold text-lg'>{dict.CalendarGroups.select}</p>
        </div>
    )

    const [ dataResult ] = await Promise.allSettled([ 
        getGroupById(locale, group)
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place={`Group: ${group}`}
            notFound
            goBack={false}
        />
    )

    const dates = getGroupCalendarDates(dataResult.value)
    const groupsData = getGroupCalendarData(dataResult.value)

    return (
        <ClientHydration fallback={<GroupCalendarLoading/>}>
            <CalendarSegment dates={dates} groupsData={groupsData} />
        </ClientHydration>
    )
}

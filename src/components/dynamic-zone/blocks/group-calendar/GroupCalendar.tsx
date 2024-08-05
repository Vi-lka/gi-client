import ErrorHandler from '@/components/errors/ErrorHandler'
import CourseFilter from '@/components/filters/CourseFilter'
import GroupFilter from '@/components/filters/entities/GroupFilter'
import { TypographyH2 } from '@/components/typography'
import { getDictionary } from '@/lib/getDictionary'
import { getGroupById, getGroups } from '@/lib/queries/groups'
import type { GroupCalendarCompT } from '@/lib/types/components'
import { GroupCourseEnum } from '@/lib/types/entities'
import { cn } from '@/lib/utils'
import { headers } from 'next/headers'
import React, { Suspense } from 'react'

export default async function GroupCalendar({
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

    const dict = await getDictionary(locale)

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
            <div className='flex sm:flex-row flex-col gap-3 items-center justify-between mb-6'>
                {data.connected 
                    ? null
                    : (
                        <div className='sm:w-1/2 w-full'>
                            <CourseFilter />
                        </div>
                    )
                }
                <div className={data.connected ? 'w-full' : 'sm:w-1/2 w-full'}>
                    <GroupFilter searchParams={searchParams} connected={data.connected} slug={slug} />
                </div>
            </div>
            <Suspense 
                key={`course=${course}&group=${group}`} 
                fallback={"GroupCalendar Loading..."}
            >
              <GroupCalendarContent
                locale={locale}
                dict={dict}
                searchParams={searchParams}
              />
            </Suspense>
        </div>
    )
}

async function GroupCalendarContent({
    locale,
    dict,
    searchParams,
}: {
    locale: string,
    dict: Dictionary,
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const group = searchParams["group"] as string | undefined;

    if (!group) return (<>Select Group</>)

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

    return (<>GroupCalendar</>)
}

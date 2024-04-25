import TabsComp from '@/components/TabsComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { headers } from 'next/headers';
import React from 'react'
import EducationalProgramsItem from '../entities-cards/EducationalProgramsItem';
import { getEducationalPrograms } from '@/lib/queries/educational-programs';
import type { EducationalProgramSingleT } from '@/lib/types/entities';

export default async function EducationalProgramsAll({
    searchParams,
    connected,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const dict = await getDictionary(locale)

    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;

    const sameParams = { locale, sort, search, filterBy: connected ? slug : undefined }
    const [ 
        bachelorsResult,
        magistracyResult,
        postgraduateResult
    ] = await Promise.allSettled([
        getEducationalPrograms({ ...sameParams, type: "bachelor" }),
        getEducationalPrograms({ ...sameParams, type: "magistracy" }),
        getEducationalPrograms({ ...sameParams, type: "postgraduate" }),
    ]);

    const bachelors = bachelorsResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={bachelorsResult.reason as unknown}
                    place="Bachelor"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid locale={locale} buttonTitle={dict.Buttons.more} data={bachelorsResult.value.data} />,
            count: bachelorsResult.value.meta.pagination.total
        }

    const magistracy = magistracyResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={magistracyResult.reason as unknown}
                    place="Magistracy"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid locale={locale} buttonTitle={dict.Buttons.more} data={magistracyResult.value.data} />,
            count: magistracyResult.value.meta.pagination.total
        }

    const postgraduate = postgraduateResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={postgraduateResult.reason as unknown}
                    place="Postgraduate"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid locale={locale} buttonTitle={dict.Buttons.more} data={postgraduateResult.value.data} />,
            count: postgraduateResult.value.meta.pagination.total
        }

    const tabs = [
        {
            value: "bachelor",
            title: dict.Entities.EducationalPrograms.bachelor,
            content: bachelors.content,
            count: bachelors.count
        },
        {
            value: "magistracy",
            title: dict.Entities.EducationalPrograms.magistracy,
            content: magistracy.content,
            count: magistracy.count
        },
        {
            value: "postgraduate",
            title: dict.Entities.EducationalPrograms.postgraduate,
            content: postgraduate.content,
            count: postgraduate.count
        },
    ]

    if (bachelors.count === 0 && magistracy.count === 0 && postgraduate.count === 0) {
        return (
            <ErrorHandler
                error={Error("NEXT_NOT_FOUND")}
                place={dict.Entities.EducationalPrograms.title}
                notFound
                goBack={false}
            />
        )
    }

    return (
        <TabsComp tabs={tabs} />
    )
}

function EducationalProgramsGrid({
    locale,
    data,
    buttonTitle
}: {
    locale: string,
    data: EducationalProgramSingleT[],
    buttonTitle: string,
}) {
    
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-fr lg:gap-8 gap-6">
            {data.map(item => (
                <EducationalProgramsItem key={"edu-program" + item.id} locale={locale} item={item} buttonTitle={buttonTitle} />
            ))}
        </div>
    )
}
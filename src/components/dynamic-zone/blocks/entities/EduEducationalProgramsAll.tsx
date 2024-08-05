import TabsComp from '@/components/TabsComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { getDictionary } from '@/lib/getDictionary';
import { headers } from 'next/headers';
import React, { Suspense } from 'react'
import EducationalProgramsItem from '../entities-cards/EducationalProgramsItem';
import { getEduEducationalPrograms } from '@/lib/queries/educational-programs';
import type { EducationalProgramSingleT } from '@/lib/types/entities';
import EducationalProgramsLoading from '@/components/loadings/EducationalProgramsLoading';
import { ClientHydration } from '@/components/ClientHydration';
import type { CollectionAllCompT } from '@/lib/types/components';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const SearchField = dynamic(
    () => import('@/components/filters/SearchField'), {loading: () => <Skeleton className='w-full h-10' />}
)
const DepartmentsFilter = dynamic(
    () => import('@/components/filters/entities/DepartmentsFilter'), {loading: () => <Skeleton className='w-full h-10' />}
)

export default async function EducationalProgramsAll({
    searchParams,
    data,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    data: CollectionAllCompT,
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";
    const slug = headersList.get('x-slug') || undefined;

    const search = searchParams["search_edueduProg"] as string | undefined;
    const departmentsParam = searchParams["departments"] as string | undefined;

    const dict = await getDictionary(locale)

    return (
        <>
            {data.showSearch && (
                <div className='w-full'>
                    <SearchField placeholder={dict.Inputs.search} param='search_edueduProg' className='mb-3' />
                </div>
            )}
            {data.showFilters && (
                <div className='mb-6'>
                    <DepartmentsFilter searchParams={searchParams} />
                </div>
            )}
            <Suspense 
                key={`search_edueduProg=${search}&departments=${departmentsParam}`} 
                fallback={<EducationalProgramsLoading />}
            >
                <EducationalProgramsAllContent locale={locale} slug={slug} dict={dict} searchParams={searchParams} connected={data.connected} />
            </Suspense>
        </>
    )
}

async function EducationalProgramsAllContent({
    locale,
    slug,
    dict,
    searchParams,
    connected,
}: {
    locale: string,
    slug: string | undefined,
    dict: Dictionary,
    searchParams: { [key: string]: string | string[] | undefined };
    connected?: boolean | null;
}) {
    const search = searchParams["search_edueduProg"] as string | undefined;
    const departmentsParam = searchParams["departments"] as string | undefined;

    const departments = departmentsParam?.split("_or_")

    const sameParams = { locale, search, departments, filterBy: connected ? slug : undefined }
    const [ 
        bachelorsResult,
        magistracyResult,
        postgraduateResult
    ] = await Promise.allSettled([
        getEduEducationalPrograms({ ...sameParams, type: "bachelor" }),
        getEduEducationalPrograms({ ...sameParams, type: "magistracy" }),
        getEduEducationalPrograms({ ...sameParams, type: "postgraduate" }),
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
        <ClientHydration fallback={<EducationalProgramsLoading />}>
            <TabsComp tabs={tabs} />
        </ClientHydration>
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
                <EducationalProgramsItem 
                  key={"edu-edu-program" + item.id} 
                  locale={locale} 
                  item={item} 
                  buttonTitle={buttonTitle} 
                  parentLink="education/programs"
                />
            ))}
        </div>
    )
}
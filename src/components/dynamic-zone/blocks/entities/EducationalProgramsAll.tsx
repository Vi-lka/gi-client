import { ClientHydration } from '@/components/ClientHydration';
import ImageComp from '@/components/ImageComp';
import Link from '@/components/Link';
import TabsComp from '@/components/TabsComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getDictionary } from '@/lib/getDictionary';
import { getEducationalPrograms } from '@/lib/queries';
import type { EducationalProgramSingleT } from '@/lib/types';
import { headers } from 'next/headers';
import React from 'react'

export default async function EducationalProgramsAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const dict = await getDictionary(locale)

    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;

    const [ 
        bachelorsResult,
        magistracyResult,
        postgraduateResult
    ] = await Promise.allSettled([
        getEducationalPrograms({ locale, sort, search, type: "bachelor" }),
        getEducationalPrograms({ locale, sort, search, type: "magistracy" }),
        getEducationalPrograms({ locale, sort, search, type: "postgraduate" }),
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
                <Card key={item.id} className='min-w-0 shrink-0 grow-0 h-full border-none shadow-md rounded-3xl'>
                    <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                        <ClientHydration fallback={<Skeleton className='w-full object-cover rounded-2xl aspect-[2/1]'/>}>
                            <ImageComp
                                src={item.attributes.image.data?.attributes.url}
                                alt={item.attributes.title}
                                fill={false}
                                width={400}
                                height={150}
                                className='w-full object-cover rounded-2xl aspect-[2/1]'
                            />
                        </ClientHydration>
    
                        <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary text-base'>
                            <div className=' dark:text-muted-foreground'>
                                <p>{item.attributes.mainCode}</p>
                                <p>{item.attributes.mainName}</p>
                            </div>
                            <div>
                                <p>{item.attributes.code}</p>
                                <p className='font-bold'>{item.attributes.title}</p>
                            </div>
                        </div>
    
                        <Link locale={locale} href={`/admission/${item.attributes.slug}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                            <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                                {buttonTitle}
                            </Button>
                        </Link>
                    </CardContent>
                </Card> 
            ))}
        </div>
    )
}
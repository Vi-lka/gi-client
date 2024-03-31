import ImageComp from '@/components/ImageComp';
import TabsComp from '@/components/TabsComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getEducationalPrograms } from '@/lib/queries';
import type { EducationalProgramSingleT } from '@/lib/types';
import Link from 'next/link';
import React from 'react'

export default async function EducationalProgramsAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;

    const [ 
        bachelorsResult,
        magistracyResult,
        postgraduateResult
    ] = await Promise.allSettled([
        getEducationalPrograms({ sort, search, type: "bachelor" }),
        getEducationalPrograms({ sort, search, type: "magistracy" }),
        getEducationalPrograms({ sort, search, type: "postgraduate" }),
    ]);

    const bachelors = bachelorsResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={bachelorsResult.reason as unknown}
                    place="Бакалавриат"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid data={bachelorsResult.value.data} />,
            count: bachelorsResult.value.meta.pagination.total
        }

    const magistracy = magistracyResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={magistracyResult.reason as unknown}
                    place="Магистратура"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid data={magistracyResult.value.data} />,
            count: magistracyResult.value.meta.pagination.total
        }

    const postgraduate = postgraduateResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={postgraduateResult.reason as unknown}
                    place="Аспирантура"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid data={postgraduateResult.value.data} />,
            count: postgraduateResult.value.meta.pagination.total
        }

    const tabs = [
        {
            value: "bachelor",
            title: "Бакалавриат",
            content: bachelors.content,
            count: bachelors.count
        },
        {
            value: "magistracy",
            title: "Магистратура",
            content: magistracy.content,
            count: magistracy.count
        },
        {
            value: "postgraduate",
            title: "Аспирантура",
            content: postgraduate.content,
            count: postgraduate.count
        },
    ]

    if (bachelors.count === 0 && magistracy.count === 0 && postgraduate.count === 0) {
        return (
            <ErrorHandler
                error={Error("NEXT_NOT_FOUND")}
                place="Образовательные программы"
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
    data,
}: {
    data: EducationalProgramSingleT[]
}) {
    
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-fr lg:gap-8 gap-6">
            {data.map(item => (
                <Card key={item.id} className='min-w-0 shrink-0 grow-0 h-full border-none shadow-md rounded-3xl'>
                    <CardContent className="w-full h-full flex flex-col xl:gap-8 gap-6 md:justify-normal justify-between p-3">
                        <ImageComp
                            src={item.attributes.image.data?.attributes.url}
                            alt={item.attributes.title}
                            fill={false}
                            width={400}
                            height={150}
                            className='w-full object-cover rounded-2xl aspect-[2/1]'
                        />
    
                        <div className='flex flex-col justify-between gap-3 xl:px-8 px-5 text-primary text-base'>
                            <div>
                                <p>{item.attributes.mainCode}</p>
                                <p>{item.attributes.mainName}</p>
                            </div>
                            <div>
                                <p>{item.attributes.code}</p>
                                <p className='font-bold'>{item.attributes.title}</p>
                            </div>
                        </div>
    
                        <Link href={`/entrance/${item.attributes.slug}`} className='w-fit mx-auto mb-3 md:mt-auto'>
                            <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                                Подробнее
                            </Button>
                        </Link>
                    </CardContent>
                </Card> 
            ))}
        </div>
    )
}
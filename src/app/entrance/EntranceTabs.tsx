import TabsComp from '@/components/TabsComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH2 } from '@/components/typography';
import { getEducationalPrograms } from '@/lib/queries';
import React from 'react'
import EntranceGrid from './EntranceGrid';

export default async function EntranceTabs({
    searchParams,
    id,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
    id?: string,
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
            content: <EntranceGrid data={bachelorsResult.value.data} />,
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
            content: <EntranceGrid data={magistracyResult.value.data} />,
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
            content: <EntranceGrid data={postgraduateResult.value.data} />,
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
            >
                <section id={id} className='lg:pt-28 pt-20'>
                    <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                        Образовательные программы
                    </TypographyH2>
                </section>
            </ErrorHandler>
        )
    }

    return (
        <section id={id} className='lg:pt-28 pt-20'>
            <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                Образовательные программы
            </TypographyH2>
            <TabsComp tabs={tabs} />
        </section>
    )
}

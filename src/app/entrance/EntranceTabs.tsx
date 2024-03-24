import TabsComp from '@/components/TabsComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH2 } from '@/components/typography';
import { getEducationalPrograms } from '@/lib/queries';
import React from 'react'

export default async function EntranceTabs({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const defaultPageSize = 12;

    const page = Number(searchParams["page"]) ?? 1;
    const pageSize = Number(searchParams["pageSize"]) ?? defaultPageSize;
    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;

    const [ 
        bachelorsResult,
        magistracyResult,
        postgraduateResult
    ] = await Promise.allSettled([
        getEducationalPrograms({ page, pageSize, sort, search, type: "bachelor" }),
        getEducationalPrograms({ page, pageSize, sort, search, type: "magistracy" }),
        getEducationalPrograms({ page, pageSize, sort, search, type: "postgraduate" }),
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
            content: <div>bachelors</div>,
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
            content: <div>magistracy</div>,
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
            content: <div>postgraduate</div>,
            count: postgraduateResult.value.meta.pagination.total
        }

    const tabs = [
        {
            value: "bachelor",
            title: "bachelor",
            content: bachelors.content,
            count: bachelors.count
        },
        {
            value: "magistracy",
            title: "magistracy",
            content: magistracy.content,
            count: magistracy.count
        },
        {
            value: "postgraduate",
            title: "postgraduate",
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
        <div className=''>
            <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
                Образовательные программы
            </TypographyH2>
            <TabsComp tabs={tabs} />
        </div>
    )
}

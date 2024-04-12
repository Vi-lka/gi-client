import ImageComp from '@/components/ImageComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getDpoCourses } from '@/lib/queries';
import React from 'react'
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { declOfNum } from '@/lib/utils';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';
import { MdOutlineCurrencyRuble } from 'react-icons/md';
import PaginationControls from '@/components/PaginationControls';
import Link from '@/components/Link';
import { headers } from 'next/headers';

const DEFAULT_PAGE_SIZE = 12;

export default async function DpoCoursesAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    const headersList = headers();
    const header_locale = headersList.get('x-locale') || "";

    const sort = searchParams["sort"] as string | undefined;
    const search = searchParams["search"] as string | undefined;
    const page = searchParams["page_dpo"] ?? "1";
    const pageSize = searchParams["per_dpo"] ?? DEFAULT_PAGE_SIZE;


    const [ dataResult ] = await Promise.allSettled([ 
        getDpoCourses({ 
            sort, 
            search, 
            page: Number(page), 
            pageSize: Number(pageSize),
        }) 
    ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler
            error={dataResult.reason as unknown}
            place="Курсы ДПО"
            notFound
            goBack={false}
        />
    )

    return (
        <>
            <div id="dpo-courses" className="grid lg:grid-cols-2 grid-cols-1 lg:auto-rows-fr lg:gap-8 gap-6">
                {dataResult.value.data.map(item => (
                    <Card key={item.id} className='min-w-0 h-full border-none shadow-md rounded-3xl'>
                        <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                            <ImageComp
                                src={item.attributes.image.data?.attributes.url}
                                alt={item.attributes.title}
                                fill={false}
                                width={400}
                                height={150}
                                className='lg:w-[45%] w-full object-cover rounded-2xl lg:aspect-[4/5] aspect-[2/1]'
                            />

                            <div className='lg:w-[55%] w-full flex flex-col gap-6 justify-between text-primary'>
                                <h4 className='xl:text-xl lg:text-lg sm:text-xl text-lg font-bold lg:mr-6'>{item.attributes.title}</h4>
                                <div className='w-full flex flex-col gap-6 justify-end'>
                                    <ul className='flex flex-col gap-3 lg:mr-6'>
                                        {(item.attributes.dateStart || item.attributes.dateEnd) && (
                                            <li className='flex items-center gap-2 font-medium'>
                                                <CalendarDays className='w-auto h-5' />
                                                <p>
                                                    {item.attributes.dateStart && (
                                                        format(item.attributes.dateStart, "P", { locale: ru })
                                                    )}
                                                    {item.attributes.dateStart && item.attributes.dateEnd && " - "}
                                                    {item.attributes.dateEnd && (
                                                        format(item.attributes.dateEnd, "P", { locale: ru })
                                                    )}
                                                </p>
                                            </li>
                                        )}
                                        {item.attributes.location && (
                                            <li className='flex items-center gap-2 font-medium'>
                                                <MapPin className='w-auto h-5' />
                                                {item.attributes.location}
                                            </li>
                                        )}
                                        {item.attributes.hours && (
                                            <li className='flex items-center gap-2 font-medium'>
                                                <Clock3 className='w-auto h-5' />
                                                {item.attributes.hours.toString() + declOfNum(item.attributes.hours, [' час', ' часа', ' часов'])}
                                            </li>
                                        )}
                                        {item.attributes.price && (
                                            <li className='flex items-center gap-2 font-medium'>
                                                <MdOutlineCurrencyRuble className='w-auto h-5' />
                                                {item.attributes.price}
                                            </li>
                                        )}
                                    </ul>
                                        
                                    <Link locale={header_locale} href={`/dpo/${item.attributes.slug}`} className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
                                        <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                                            Подробнее
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card> 
                ))}
            </div>
            <div className="mt-6">
              <PaginationControls
                length={dataResult.value.meta.pagination.total}
                defaultPageSize={DEFAULT_PAGE_SIZE}
                scrollToId='dpo-courses'
                pageParam='page_dpo'
                perParam='per_dpo'
              />
            </div>
        </>
    )
}

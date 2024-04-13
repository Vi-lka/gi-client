import CarouselComp from '@/components/CarouselComp';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { getGraduates } from '@/lib/queries';
import React from 'react';
import { cn, splitArray } from '@/lib/utils';
import ImageComp from '@/components/ImageComp';
import { headers } from 'next/headers';

export default async function GraduatesAll({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const search = searchParams["search"] as string | undefined;

    const [ dataResult ] = await Promise.allSettled([ getGraduates({ locale, search }) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Graduates All"
            notFound
            goBack={false}
        />
    )

    if (!search && dataResult.value.meta.pagination.total === 0) return null

    return (
        <CarouselComp className='lg:-ml-8 -ml-4'>
            {splitArray(dataResult.value.data, 3).map((arr, index) => (
                <CarouselItem 
                    key={index} 
                    className={cn(
                        'md:basis-1/2 lg:pl-8 pl-4 grid grid-rows-3 gap-8',
                        dataResult.value.meta.pagination.total === 1 && "grid-rows-1",
                        dataResult.value.meta.pagination.total === 2 && "grid-rows-2"
                    )}
                >
                    {arr.map(graduate => (
                        <Card key={graduate.id} className='h-full border-none shadow-md rounded-3xl'>
                            <CardContent className="w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 p-6">
                                <ImageComp 
                                    src={graduate.attributes.image.data?.attributes.url}
                                    alt="Image"
                                    fill={false}
                                    width={130}
                                    height={130}
                                    className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                                />
                    
                                <div className='flex flex-col flex-1 justify-between gap-6 text-primary xl:text-base text-sm'>
                                    <div>
                                        <p className='font-bold mb-1'>{graduate.attributes.title}</p>
                                        <p>{graduate.attributes.description}</p>
                                    </div>
                                    <p>{graduate.attributes.additionalInfo}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CarouselItem>
            ))}
        </CarouselComp>
    )
}

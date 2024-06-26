import React from 'react';
import { cn } from '@/lib/utils';
import IconsBlockItems from './IconsBlockItems';
import ImageComp from '@/components/ImageComp';
import { TypographyH2 } from '@/components/typography';
import { ClientHydration } from '@/components/ClientHydration';
import { Button } from '@/components/ui/button';
import Link from '@/components/Link';
import { headers } from 'next/headers';
import IconsBlockLoading from '@/components/loadings/IconsBlockLoading';
import { Skeleton } from '@/components/ui/skeleton';
import type { IconsBlockCompT } from '@/lib/types/components';

export default function IconsBlock({
    data,
    headingBig,
    className,
}: {
    data: IconsBlockCompT,
    headingBig?: boolean,
    className?: string,
}) {

    const headersList = headers();
    const header_locale = headersList.get('x-locale') || "";
    
    return (
        <div className={cn("", className)}>
            <div className={cn(
                "w-full flex xl:flex-row flex-col xl:gap-8 gap-4",
                data.backgroundOn ? "bg-card border border-transparent dark:border-border/20 shadow-md p-3 rounded-3xl overflow-hidden text-primary" : "",
                data.image.data ? "items-stretch" : "items-center",
                data.backgroundOn && !data.image.data ? "lg:p-8 p-2" : "",
                data.alignImage === "right" ? "xl:flex-row-reverse" : "",
            )}>
                {data.image.data && (
                    <div className='relative xl:w-1/3 w-full xl:h-auto h-fit rounded-3xl overflow-hidden'>
                        <ClientHydration fallback={<Skeleton className='w-full h-full xl:max-h-none max-h-96 xl:aspect-auto aspect-video'/>}>
                            <ImageComp 
                                src={data.image.data.attributes.url}
                                alt=""
                                fill
                                sizes='(max-width: 1024px) 100vw, 40vw'
                                className='!xl:absolute !relative object-cover xl:max-h-none max-h-96'
                            />
                        </ClientHydration>
                    </div>
                )}

                <div className='flex flex-col justify-between flex-1 mt-4 xl:w-auto w-full'>
                    <div className={cn(
                        data.backgroundOn ? "xl:px-0 sm:px-12 px-6" : "",
                    )}>
                        {data.title && (
                            <TypographyH2 
                                className={cn(
                                    'font-semibold text-primary mb-8 border-none',
                                    headingBig ? "text-4xl lg:text-5xl" : ""
                                )}
                            >
                                {data.title}
                            </TypographyH2>
                        )}

                        <ClientHydration fallback={<IconsBlockLoading isList={data.isList} />}>
                            <IconsBlockItems items={data.items} isList={data.isList}/>
                        </ClientHydration>
                    </div>

                    {data.moreLink && (
                        <Link locale={header_locale} href={data.moreLink} target='__blank' className='w-fit self-end float-end xl:mt-2 mt-8'>
                            <Button className='uppercase rounded-3xl font-medium px-10 py-5'>{data.moreTitle}</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
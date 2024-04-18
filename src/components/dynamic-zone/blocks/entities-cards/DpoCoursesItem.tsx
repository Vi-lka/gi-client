import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { DpoCoursesSingleT } from '@/lib/types'
import { declOfNum, formatDate, getShortText } from '@/lib/utils'
import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import React from 'react'
import { MdOutlineCurrencyRuble } from 'react-icons/md'

export default function DpoCoursesItem({
    locale,
    item,
    dict
}: {
    locale: string
    item: DpoCoursesSingleT,
    dict: Dictionary,
}) {
    return (
        <Card key={"dpo-course" + item.id} className='min-w-0 h-full border-none shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                <ClientHydration fallback={<Skeleton className='lg:w-[45%] w-full rounded-2xl lg:aspect-[4/5] aspect-[2/1]'/>}>
                    <ImageComp
                        src={item.attributes.image.data?.attributes.url}
                        alt={item.attributes.title}
                        fill={false}
                        width={400}
                        height={150}
                        className='lg:w-[45%] w-full object-cover rounded-2xl lg:aspect-[4/5] aspect-[2/1]'
                    />
                </ClientHydration>
                
                <div className='flex-1 lg:w-[55%] w-full flex flex-col gap-6 justify-between text-primary'>
                    <div className='lg:mr-6'>
                        <h4 className='xl:text-xl lg:text-lg sm:text-xl text-lg font-bold line-clamp-3'>
                            {getShortText(item.attributes.title, 6)}
                        </h4>

                        {item.attributes.description && (
                            <p className='text-xs text-foreground dark:text-muted-foreground line-clamp-6 mt-3'>
                                {getShortText(item.attributes.description, 40)}
                            </p>
                        )}
                    </div>

                    <div className='w-full flex flex-col gap-6 justify-end'>
                        <ul className='flex flex-col gap-3 lg:mr-6 text-primary'>
                            {(item.attributes.dateStart || item.attributes.dateEnd) && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <CalendarDays className='w-auto h-5 ' />
                                    <p>
                                        {item.attributes.dateStart && formatDate(item.attributes.dateStart, locale)}
                                        {item.attributes.dateStart && item.attributes.dateEnd && " - "}
                                        {item.attributes.dateEnd && formatDate(item.attributes.dateEnd, locale)}
                                    </p>
                                </li>
                            )}
                            {item.attributes.location && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <MapPin className='w-auto h-5 ' />
                                    {item.attributes.location}
                                </li>
                            )}
                            {item.attributes.hours && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <Clock3 className='w-auto h-5 ' />
                                    {
                                        item.attributes.hours.toString() 
                                        + 
                                        " " 
                                        + 
                                        declOfNum(item.attributes.hours, [dict.Entities.DPO.hour, dict.Entities.DPO.hours, dict.Entities.DPO.hoursSecond])
                                    }
                                </li>
                            )}
                            {item.attributes.price && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <MdOutlineCurrencyRuble className='w-auto h-5 ' />
                                    {item.attributes.price}
                                </li>
                            )}
                        </ul>
                            
                        <Link locale={locale} href={`/dpo/${item.attributes.slug}`} className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
                            <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                                {dict.Buttons.more}
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card> 
    )
}

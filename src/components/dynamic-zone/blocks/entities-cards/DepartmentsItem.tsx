import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import NextLink from "next/link";
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { DepartmentSingleT } from '@/lib/types/entities'
import { getShortText } from '@/lib/utils'
import { AtSign, Globe, MapPin } from 'lucide-react'
import React from 'react'
import { FiPhone } from 'react-icons/fi'

export default function DepartmentsItem({
    locale,
    item,
    dict
}: {
    locale: string
    item: DepartmentSingleT,
    dict: Dictionary,
}) {



    const url = item.attributes.contacts?.url ? new URL(item.attributes.contacts.url) : undefined

    return (
        <Card key={"department" + item.id} className='min-w-0 h-full border-none shadow-md rounded-3xl'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                <ClientHydration fallback={<Skeleton className='lg:w-[45%] w-full rounded-2xl lg:aspect-[5/3] aspect-[3/1]'/>}>
                    <Link 
                        locale={locale} 
                        href={`/structure/${item.attributes.slug}`} 
                        className='relative lg:w-[45%] w-full lg:aspect-[5/3] aspect-[3/1] rounded-2xl overflow-hidden hover:ring-2 dark:hover:ring-1 ring-ring ring-offset-1 ring-offset-card transition-all duration-300'
                    >
                        <ImageComp
                            src={item.attributes.image.data?.attributes.url}
                            alt={item.attributes.title}
                            fill
                            sizes='(max-width: 1024px) 100vw, 20vw'
                            className='object-cover'
                        />
                    </Link>
                </ClientHydration>
                
                <div className='flex-1 lg:w-[55%] w-full flex flex-col gap-6 justify-between text-primary'>
                    <h4 className='xl:text-xl lg:text-lg sm:text-xl text-lg font-bold line-clamp-5'>
                        {getShortText(item.attributes.title, 12)}
                    </h4>

                    {item.attributes.contacts && (
                        <ul className='flex flex-col gap-3 lg:mr-6 text-sm text-primary'>
                            {item.attributes.contacts.url && url && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <Globe className='w-auto h-5 ' />
                                    <NextLink 
                                        href={item.attributes.contacts.url}
                                        target='__blank'
                                        className='flex-1 hover:underline underline-offset-2'
                                    >
                                        {url.hostname}
                                    </NextLink>
                                </li>
                            )}
                            {item.attributes.contacts.email && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <AtSign className='w-auto h-5 ' />
                                    <NextLink 
                                        href={`mailto:${item.attributes.contacts.phone}`} 
                                        className='flex-1 hover:underline underline-offset-2'
                                    >
                                        {item.attributes.contacts.email}
                                    </NextLink>
                                </li>
                            )}
                            {item.attributes.contacts.phone && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <FiPhone className='w-auto h-5 ' />
                                    <NextLink 
                                        href={`tel:${item.attributes.contacts.phone}`} 
                                        className='flex-1 hover:underline underline-offset-2'
                                    >
                                        {item.attributes.contacts.phone}
                                    </NextLink>
                                </li>
                            )}
                            {item.attributes.contacts.location && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <MapPin className='w-auto h-5 ' />
                                    <NextLink 
                                        href={`https://maps.yandex.ru/?text=${item.attributes.contacts.location}`} 
                                        target='__blank'
                                        className='flex-1 hover:underline underline-offset-2'
                                    >
                                        {item.attributes.contacts.location}
                                    </NextLink>
                                </li>
                            )}
                        </ul>
                    )}

                    <div className='w-full flex flex-col gap-6 justify-end'>
                        <Link locale={locale} href={`/structure/${item.attributes.slug}`} className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
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

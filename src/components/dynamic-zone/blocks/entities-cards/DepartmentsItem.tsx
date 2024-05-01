import { ClientHydration } from '@/components/ClientHydration'
import ImageComp from '@/components/ImageComp'
import Link from '@/components/Link'
import NextLink from "next/link";
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { DepartmentSingleT } from '@/lib/types/entities'
import { getShortText } from '@/lib/utils'
import { AtSign, CircleUser, Globe, MapPin } from 'lucide-react'
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
    return (
        <Card key={"department" + item.id} className='min-w-0 h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
            <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
                <ClientHydration fallback={<Skeleton className='lg:w-[45%] w-full rounded-2xl lg:aspect-[5/3] aspect-[3/1]'/>}>
                    <Link 
                        locale={locale} 
                        href={`/structure/${item.attributes.slug}`} 
                        className='relative lg:w-[45%] w-full lg:aspect-[5/3] aspect-[3/1] rounded-2xl overflow-hidden'
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
                
                <div className='flex-1 lg:w-[55%] w-full flex flex-col justify-between text-primary space-y-8'>
                    <Link locale={locale} href={`/structure/${item.attributes.slug}`} className='w-fit'>
                        <h4 className='xl:text-xl lg:text-lg sm:text-xl text-lg font-bold line-clamp-5 md:translate-y-1 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                            {getShortText(item.attributes.title, 12)}
                        </h4>
                    </Link>

                    {(item.attributes.contacts || item.attributes.head.data) && (
                        <ul className='flex flex-col gap-3 lg:flex-1 lg:mr-6 text-sm text-primary'>
                            {item.attributes.head.data && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <CircleUser className='w-auto h-5 ' />
                                    <Link 
                                      locale={locale}
                                      href={`/structure/employees/${item.attributes.head.data.attributes.slug}`}
                                      className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
                                    >
                                        {item.attributes.head.data.attributes.title}
                                    </Link>
                                </li>
                            )}
                            {item.attributes.contacts?.url && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <Globe className='w-auto h-5 ' />
                                    <NextLink 
                                        href={item.attributes.contacts.url}
                                        target='__blank'
                                        className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
                                    >
                                        {new URL(item.attributes.contacts.url).hostname}
                                    </NextLink>
                                </li>
                            )}
                            {item.attributes.contacts?.email && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <AtSign className='w-auto h-5 ' />
                                    <NextLink 
                                        href={`mailto:${item.attributes.contacts.email}`} 
                                        className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
                                    >
                                        {item.attributes.contacts.email}
                                    </NextLink>
                                </li>
                            )}
                            {item.attributes.contacts?.phone && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <FiPhone className='w-auto h-5 ' />
                                    <NextLink 
                                        href={`tel:${item.attributes.contacts.phone}`} 
                                        className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
                                    >
                                        {item.attributes.contacts.phone}
                                    </NextLink>
                                </li>
                            )}
                            {item.attributes.contacts?.location && (
                                <li className='flex items-center gap-2 font-medium'>
                                    <MapPin className='w-auto h-5 ' />
                                    <NextLink 
                                        href={`https://maps.yandex.ru/?text=${item.attributes.contacts.location}`} 
                                        target='__blank'
                                        className='flex-1 hover:underline underline-offset-2 group-hover/card:translate-x-0.5 transition transform-gpu duration-300'
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

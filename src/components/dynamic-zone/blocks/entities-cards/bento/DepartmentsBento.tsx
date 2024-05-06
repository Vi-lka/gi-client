import { ClientHydration } from '@/components/ClientHydration'
import { BentoGrid, BentoGridItem } from '@/components/ui/aceternity/bento-grid'
import { Skeleton } from '@/components/ui/skeleton'
import type { DepartmentSingleT, DepartmentsT } from '@/lib/types/entities'
import { cn, getShortText, calcBento } from '@/lib/utils'
import { AtSign, ChevronRight, CircleUser, Globe, MapPin } from 'lucide-react'
import React from 'react'
import { FiPhone } from 'react-icons/fi'
import BentoImage from './BentoImage'
import MoreButton from '@/components/MoreButton'
import Link from '@/components/Link'
import NextLink from "next/link"

export default function DepartmentsBento({
    locale,
    departments,
}: {
    locale: string,
    departments: DepartmentsT,
}) {
    return (
        <BentoGrid>
            {departments.data.map((item, i) => {
                const isEach = calcBento(i, departments.data.length)
                const hasImage = Boolean(item.attributes.image.data?.attributes.url)
                
                return (
                    <BentoGridItem
                        key={"department-bento-" + item.id}
                        header={
                            hasImage ? (
                                <ClientHydration fallback={
                                    <Skeleton className={cn(
                                        'w-full min-h-24 rounded-2xl', 
                                        isEach ? "aspect-[4/1]" : "aspect-[2/1]",
                                        departments.meta.pagination.total === 1 ? "aspect-[4/1]" : "",
                                    )}/>
                                }>
                                    <BentoImage 
                                        href={`/structure/${item.attributes.slug}`} 
                                        src={item.attributes.image.data?.attributes.url}
                                        alt={item.attributes.title}
                                        sizes={
                                            departments.meta.pagination.total === 1 
                                            ? "100vw"
                                            : isEach 
                                                ? "(max-width: 1024px) 100vw, 70vw" 
                                                : "(max-width: 1024px) 100vw, 40vw"
                                        }
                                        className={cn(
                                            isEach ? "aspect-[4/1]" : "aspect-[2/1]",
                                            departments.meta.pagination.total === 1 ? "aspect-[4/1]" : "",
                                        )}
                                    />
                                </ClientHydration>
                            )
                            : null
                        }
                        footer={
                            <div className='w-full flex-auto flex flex-col gap-6 justify-end'>
                                <MoreButton 
                                    href={`/structure/${item.attributes.slug}`}
                                    variant="link"
                                    className='h-6 p-0 text-xs'
                                >
                                    <ChevronRight size={20} />
                                </MoreButton>
                            </div>
                        }
                        className={cn(
                            isEach ? "lg:col-span-2" : "",
                            departments.meta.pagination.total === 1 ? "lg:col-span-3" : "",
                            hasImage ? "p-4" : "p-8"
                        )}
                    >
                        <Link locale={locale} href={`/structure/${item.attributes.slug}`} className='w-fit'>
                            <h4 className='font-bold md:text-lg text-base mr-4 lg:line-clamp-3 line-clamp-5'>
                                {getShortText(item.attributes.title, 12)}
                            </h4>
                        </Link>
                        <Description locale={locale} item={item} hasImage={hasImage} />
                    </BentoGridItem>
                )
            })}
        </BentoGrid>
    )
}

function Description({ 
    locale,
    item,
    hasImage,
}: { 
    locale: string,
    item: DepartmentSingleT,
    hasImage: boolean
}) {
    if (!(item.attributes.contacts || item.attributes.head.data)) return null

    return (
        <ul className={cn(
            'flex mr-4',
            hasImage 
            ? "flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground mt-2" 
            : "flex-col gap-3 text-sm mt-8"
        )}>
            {item.attributes.head.data && (
                <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                    <CircleUser className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                    <DescriptionItem 
                        title={item.attributes.head.data.attributes.title}
                        href={`/structure/employees/${item.attributes.head.data.attributes.slug}`}
                        locale={locale}
                    />
                </li>
            )}
            {item.attributes.contacts?.url && (
                <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                    <Globe className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                    <DescriptionItem 
                        title={new URL(item.attributes.contacts.url).hostname}
                        targetBlank
                        href={item.attributes.contacts.url}
                    />
                </li>
             )}
            {item.attributes.contacts?.email && (
                <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                    <AtSign className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                    <DescriptionItem 
                        title={item.attributes.contacts.email}
                        targetBlank
                        href={`mailto:${item.attributes.contacts.email}`}
                    />
                </li>
            )}
            {item.attributes.contacts?.phone && (
                <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                    <FiPhone className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                    <DescriptionItem 
                        title={item.attributes.contacts.phone}
                        targetBlank
                        href={`tel:${item.attributes.contacts.phone}`}
                    />
                </li>
            )}
            {item.attributes.contacts?.location && (
                <li className={cn('flex items-center font-medium', hasImage ? 'gap-1' : 'gap-2')}>
                    <MapPin className={cn('w-auto', hasImage ? 'h-3' : 'h-4' )} />
                    <DescriptionItem 
                        title={item.attributes.contacts.location}
                        targetBlank
                        href={`https://maps.yandex.ru/?text=${item.attributes.contacts.location}`}
                    />
                </li>
            )}
        </ul>
    )
}

type DescriptionItemT = {
    title: string,
    href: string,
  } & (TargetBlank | NotTargetBlank);
  
type TargetBlank = {
    targetBlank: true;
};
type NotTargetBlank = {
    targetBlank?: false;
    locale: string;
};
function DescriptionItem(props: DescriptionItemT) {

    if (props.targetBlank) return (
        <NextLink 
            href={props.href}
            target='__blank'
            className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
        >
            {props.title}
        </NextLink>
    )

    return (
        <Link 
            locale={props.locale}
            href={props.href}
            className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
        >
            {props.title}
        </Link>
    )
}
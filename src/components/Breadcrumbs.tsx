"use client"

import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { usePathname } from '@/lib/hooks/usePathname'
import { useLocale } from '@/lib/hooks/useLocale'
import Link from './Link'
import { useDictionary } from './providers/DictionaryProvider'
import { uniqArray } from '@/lib/utils'
export default function Breadcrumbs({
    data,
    className
}: {
    data?: {
        slug: string,
        title: string,
    }[],
    className?: string
}) {
    const dict = useDictionary()

    const locale = useLocale()

    const pathname = usePathname()

    const pathArray = pathname.split("/")

    const breadcrumbs = pathArray.map((path, index) => {

        const sameSlug = data?.find(item => item.slug === path);

        const pathBefore = pathArray.slice(0, index+1)

        if (sameSlug) {
            return {
                title: sameSlug.title,
                href: pathBefore.join("/"),
            }
        } else {
            switch (path) {
                case '':
                    return {
                        title: dict.Header.nav.main,
                        href: '/',
                    }
                default:
                    return {
                        title: path,
                        href: "/" + path,
                    }
            }
        }
    })

    const uniqBreadcrumbs = uniqArray(breadcrumbs)

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {uniqBreadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={index}>
                        {index !== uniqBreadcrumbs.length - 1
                            ?
                            <>
                                <BreadcrumbLink asChild>
                                    <Link locale={locale} href={crumb.href}>
                                        {crumb.title}
                                    </Link>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </> 
                            :  // last element
                            <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                        }
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

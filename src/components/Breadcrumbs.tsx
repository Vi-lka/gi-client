"use client"

import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { usePathname } from 'next/navigation'

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
                        title: 'Главная',
                        href: '/',
                    }
                default:
                    return {
                        title: path,
                        href: path,
                    }
            }
        }
    })

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={index}>
                        {index !== breadcrumbs.length - 1
                            ?
                            <>

                                <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
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

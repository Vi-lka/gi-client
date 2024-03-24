"use client"

import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs({
    slug,
    title,
    className
}: {
    slug?: string,
    title?: string,
    className?: string
}) {

    const pathname = usePathname()

    const pathArray = pathname.split("/")

    const breadcrumbs = pathArray.map(path => {
        if (path === slug) {
            return {
                title: title,
                href: pathname,
            }
        } else {
            switch (path) {
                case '':
                    return {
                        title: 'Главная',
                        href: '/',
                    }
                case 'entrance': 
                    return {
                        title: 'Поступление',
                        href: '/entrance',
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

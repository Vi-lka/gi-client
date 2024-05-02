import Link from '@/components/Link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { EmployeeSinglePageT } from '@/lib/types/pages';
import React from 'react'

export default function Post({ 
    locale,
    employee
}: {
    locale: string,
    employee: EmployeeSinglePageT
}) {

    if (!employee.attributes.meta) return null

    const degree = employee.attributes.meta?.degree 
        ? employee.attributes.meta.degree.charAt(0).toUpperCase() + employee.attributes.meta.degree.slice(1) 
        : ""
    const rank = employee.attributes.meta?.rank 
        ? employee.attributes.meta.rank.charAt(0).toUpperCase() + employee.attributes.meta.rank.slice(1) 
        : ""
  
    const degree_rank_between = employee.attributes.meta && degree.length > 0 && rank.length > 0 ? ", " : ""
    const degree_rank = employee.attributes.meta
        ? degree + degree_rank_between + rank
        : null

    let postData: {
        post: string;
        department: {
            data: {
                attributes: {
                    slug: string;
                    title: string;
                    shortTitle: string;
                };
            };
        };
    } | undefined

    if (employee.attributes.meta && employee.attributes.meta.posts.length > 0) {
        if (employee.attributes.head_in_department.data) {
          postData = employee.attributes.meta.posts.find(item => item.department.data.attributes.slug === employee.attributes.head_in_department.data?.attributes.slug)
        } else {
          postData = employee.attributes.meta.posts[0]
        }
    }

    if ((employee.attributes.meta.posts.length === 1) && postData) return (
        <p className='lg:text-base text-sm text-left font-normal'>
            {postData.post + " "}
            <Link 
                locale={locale} href={`/structure/${postData.department.data.attributes.slug}`} 
                className='font-normal w-fit hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
            >
                {postData.department.data.attributes.shortTitle}
            </Link>
            , {degree_rank}
        </p>
    )

    if ((employee.attributes.meta.posts.length > 1) && postData) return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className='border-none [&[data-state=open]]:pb-0 hover:pb-0'>
                <AccordionTrigger className='p-0' iconClassName='bg-background text-foreground'>
                    <p className='lg:text-base text-sm text-left font-normal'>
                        {postData.post + " "}
                        <Link 
                            locale={locale} href={`/structure/${postData.department.data.attributes.slug}`} 
                            className='font-normal w-fit hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
                        >
                            {postData.department.data.attributes.shortTitle}
                        </Link>
                        , {degree_rank}
                    </p>
                </AccordionTrigger>
                <AccordionContent>
                    {employee.attributes.meta.posts.slice(1).map(post => (
                        <p key={post.department.data.attributes.slug} className='lg:text-base text-sm font-normal [&:not(:first-child)]:mt-1'>
                            {post.post + " "}
                            <Link 
                                locale={locale} href={`/structure/${post.department.data.attributes.slug}`} 
                                className='font-normal w-fit hover:underline underline-offset-2 hover:underline-offset-4 transition-all'
                            >
                                {post.department.data.attributes.shortTitle}
                            </Link>
                        </p>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )

    return null
}

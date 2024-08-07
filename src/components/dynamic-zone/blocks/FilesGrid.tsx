import { TypographyH2 } from '@/components/typography'
import type { FilesGridCompT } from '@/lib/types/components'
import { cn } from '@/lib/utils'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function FilesGrid({
    data,
    headingBig,
    className,
}: {
    data: FilesGridCompT,
    headingBig?: boolean,
    className?: string,
}) {

    return (
        <div className={cn("w-full grid md:grid-cols-2 gap-8", className)}>
            <div id={data.link ? data.link : ""} className='w-full'>
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

                <ul className="flex flex-col gap-4">
                    {data.items.map((item, index) => (
                        <li key={index}>
                            <Link 
                                href={item.file.data.attributes.url} 
                                target='__blank' 
                                className='flex items-center w-fit gap-2 text-primary'
                            >
                                <FileText className='w-7 h-7' />
                                <p className='flex-1 link-underline link-underline-sm link-underline-primary font-bold py-1 transition-all duration-300'>
                                    {item.title}
                                </p>
                            </Link>
                            <p className='xl:max-w-[40%] lg:max-w-[50%] md:max-w-[70%] text-sm mt-3 ml-1 dark:text-muted-foreground whitespace-pre-wrap'>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div id={data.linkSecond ? data.linkSecond : ""} className='w-full'>
                {data.titleSecond && (
                    <TypographyH2 
                        className={cn(
                            'font-semibold text-primary mb-8 border-none',
                            headingBig ? "text-4xl lg:text-5xl" : ""
                        )}
                    >
                        {data.titleSecond}
                    </TypographyH2>
                )}
    
                <ul className="flex flex-col gap-4">
                    {data.itemsSecond.map((item, index) => (
                        <li key={index}>
                            <Link 
                                href={item.file.data.attributes.url} 
                                target='__blank' 
                                className='flex items-center w-fit gap-2 text-primary'
                            >
                                <FileText className='w-7 h-7' />
                                <p className='flex-1 link-underline link-underline-sm link-underline-primary font-bold py-1 transition-all duration-300'>
                                    {item.title}
                                </p>
                            </Link>
                            <p className='xl:max-w-[40%] lg:max-w-[50%] md:max-w-[70%] text-sm mt-3 ml-1 dark:text-muted-foreground whitespace-pre-wrap'>{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

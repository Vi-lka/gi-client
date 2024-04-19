import { TypographyH2 } from '@/components/typography'
import type { FilesCompT } from '@/lib/types/components'
import { cn } from '@/lib/utils'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Files({
    data,
    headingBig,
    className,
}: {
    data: FilesCompT,
    headingBig?: boolean,
    className?: string,
}) {

    return (
        <div className={cn("w-full", className)}>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}

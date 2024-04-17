import DynamicReactIcon from '@/components/DynamicReactIcon'
import { TypographyH2, TypographyH3 } from '@/components/typography'
import type { NumbersCompT } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

export default function Numbers({
    data,
    headingBig,
    className,
}: {
    data: NumbersCompT,
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

            {data.subTitle && (
                <TypographyH3 className='uppercase text-foreground font-medium lg:text-[22px] text-xl mb-6 text-center mx-auto'>
                    {data.subTitle}
                </TypographyH3>
            )}
            <ul className="flex flex-wrap justify-items-center gap-6 [&>*:nth-child(odd):nth-last-of-type(1)]:text-center">
                {data.items.map((item, index) => (
                    <li key={index} className='flex flex-col w-[calc(50%-1.5rem)] flex-grow [&:nth-child(odd):nth-last-of-type(1)]:items-center odd:items-end odd:text-right odd:ml-auto even:mr-auto'>
                        <h4 className='flex items-center text-primary font-bold lg:text-4xl text-3xl'>
                            {item.number.toLocaleString("ru-RU")}
                            {item.icon && (
                                <DynamicReactIcon icon={item.icon} className="w-auto lg:h-6 h-5 lg:mt-2 mt-1 ml-0.5" />
                            )}
                        </h4>
                        <p className='max-w-80 whitespace-pre-wrap mt-1 dark:text-muted-foreground'>{item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
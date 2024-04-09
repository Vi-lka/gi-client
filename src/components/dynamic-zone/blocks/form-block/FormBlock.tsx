import DynamicReactIcon from '@/components/DynamicReactIcon'
import IconCustom from '@/components/IconCustom'
import { TypographyH2 } from '@/components/typography'
import type { FormBlockCompT, FormBlockItemT } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import ButtonForm from './ButtonForm'

export default function FormBlock({
    data,
    headingBig,
    className,
}: {
    data: FormBlockCompT,
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

            <div className='flex relative lg:flex-row flex-col items-center lg:gap-6 gap-10 xl:p-16 lg:p-12 p-8 rounded-3xl overflow-hidden' style={{backgroundColor: data.color ? data.color : "hsl(var(--primary))"}}>
                {data.image.data && (
                    <Image 
                        src={data.image.data.attributes.url}
                        alt=''
                        fill
                        sizes='90vw'
                        className='object-cover z-0 brightness-50 contrast-125'
                    />
                )}
                <ul className={cn(
                    "grid xl:gap-8 xl:gap-y-14 lg:gap-y-10 gap-6 items-center text-background w-full z-10",
                    data.list.length === 4 ? "lg:grid-cols-2 grid-cols-1 lg:w-3/4" : "xl:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:w-4/5"
                )}>
                    {data.list.map((item, index) => (
                        <li key={index} className='flex flex-wrap items-center gap-3 self-start'>
                            <FormBlockIcon item={item} className='min-w-8 self-start' />
                            <p className={cn(
                                'flex-1 font-semibold break-words',
                                data.largeTitles ? "2xl:text-4xl xl:text-3xl text-2xl" : "2xl:text-[1.4rem] xl:text-xl text-lg"
                            )}>
                                {item.title}
                                <span className='block font-light text-sm'>{item.description}</span>
                            </p>
                        </li>
                    ))}
                </ul>
                <ButtonForm 
                    buttonTitle={data.buttonTitle}
                    buttonLink={data.buttonLink}
                    inNewTab={data.inNewTab}
                    listLength={data.list.length}
                    formTitle={data.formTitle}
                    formDescription={data.formDescription}
                />
            </div>
        </div>
    )
}


function FormBlockIcon({
    item,
    className
}: {
    item: FormBlockItemT,
    className?: string
}) {
    if (item.iconCustom) return <IconCustom icon={item.iconCustom} className={cn('w-fit lg:h-11 sm:h-10 h-9 filter-background', className)} />
    else if (item.iconReact) return <DynamicReactIcon icon={item.iconReact} className={cn("w-fit lg:h-11 sm:h-10 h-9 text-background", className)} />
    else if (item.image.data) return (
        <Image
            src={item.image.data.attributes.url}
            alt=''
            width={48}
            height={48}
            className={cn('lg:h-11 sm:h-10 h-9 aspect-square object-cover', className)}
        />
    )
    else return null
}

'use client'

import React from 'react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSWR from 'swr';
import type { ImageT } from '@/lib/types/components';
import { useLocale } from '@/lib/hooks/useLocale';
import { Skeleton } from '../ui/skeleton';
import { useDictionary } from '../providers/DictionaryProvider';
import Link from 'next/link';

type PoliticData = {
    politic: {
        data: {
            attributes: {
                url: string | null,
                file: ImageT
            }
        }
    }
}

export default function SubmitButton({
    disabled,
    className,
    children,
}: {
    disabled?: boolean,
    className?: string,
    children?: React.ReactNode,
}) {

    const locale = useLocale();

    const dict = useDictionary()

    const { pending } = useFormStatus();

    const { data, isLoading } = useSWR<PoliticData, Error>(
        `query Politic {
          politic(locale: "${locale}") {
            data {
              attributes {
                url
                file {
                  data {
                    attributes { url }
                  }
                }
              }
            }
          }
        }`
    );

    if (isLoading) return <Skeleton className='rounded-3xl border-border shadow-sm h-9 w-full'/>;

    const politic = data 
        ? {url: data.politic.data.attributes.url, fileUrl: data.politic.data.attributes.file.data?.attributes.url}
        : null
    const politicUrl = politic?.url 
        ? politic.url
        : politic?.fileUrl

    return (
        <div className='flex flex-col gap-3 lg:items-start items-center'>
            <Button 
                type="submit"
                disabled={disabled || pending}
                className={cn('uppercase rounded-3xl w-fit', className)}
            >
                {pending ? <Loader2 className="animate-spin" /> : children}
            </Button>
            {politicUrl && (
                <span className='text-muted text-xs lg:text-start text-center'>
                    {dict.ContactForm.politic.message}
                    {" "}
                    <Link href={politicUrl} target='__blank' className='text-primary font-medium hover:underline underline-offset-2 hover:underline-offset-4 transition-all'>
                        {dict.ContactForm.politic.title}
                    </Link>
                </span>
            )}
        </div>
    )
}

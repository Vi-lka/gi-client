import ErrorHandler from '@/components/errors/ErrorHandler';
import { getLinks, getNavBar } from '@/lib/queries/additional';
import { headers } from 'next/headers';
import React from 'react'
import MenuClient from './(client)/Menu.client';
import { ClientHydration } from '@/components/ClientHydration';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export default async function Menu() {

    const headersList = headers();
    const locale = headersList.get('x-locale') || "";

    const [ 
        linksResult, 
        navBarResult 
    ] = await Promise.allSettled([ 
        getLinks(locale), 
        getNavBar(locale) 
    ]);
    if (linksResult.status === "rejected") return (
      <ErrorHandler 
        error={linksResult.reason as unknown} 
        place="Links"
        notFound={false}
      />
    )
  
    return (
        <ClientHydration fallback={
            <Skeleton className='w-full h-full flex items-center justify-center'>
                <Loader2 className='animate-spin'/>
            </Skeleton>
        }>
            <MenuClient data={{
                links: linksResult.value, 
                navBar: navBarResult.status !== "rejected" ? navBarResult.value : null
            }}/>
        </ClientHydration>
    )
}

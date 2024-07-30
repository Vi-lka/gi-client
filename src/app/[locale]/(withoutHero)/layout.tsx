import Header from '@/components/header/Header';
import HeaderLoading from '@/components/loadings/main/HeaderLoading';
import React, { Suspense } from 'react'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className=''>
            <Suspense fallback={<HeaderLoading className='[&[data-aria-hidden=true]>div]:pr-[var(--removed-body-scroll-bar-size)]' />}>
                <Header />
            </Suspense>
            <main className="flex flex-col items-center gap-12 container md:w-5/6 mx-auto lg:pt-36 pt-32">
                {children}
            </main>
        </div>
    ) 
}

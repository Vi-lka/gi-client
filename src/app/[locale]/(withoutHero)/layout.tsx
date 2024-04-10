import Header from '@/components/header/Header';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react'

export default function Layout({
    params: { locale },
    children,
}: Readonly<{
    params: { locale: string },
    children: React.ReactNode;
}>) {
    unstable_setRequestLocale(locale);

    return (
        <div className=''>
            <Header />
            <main className="flex flex-col items-center gap-12 container md:w-5/6 mx-auto lg:pt-36 pt-32">
                {children}
            </main>
        </div>
    ) 
}

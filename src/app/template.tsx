import Header from '@/components/header/Header';
import React from 'react'

export default function Template({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <>
        <Header />
        <main className="flex flex-col items-center gap-12 container md:w-5/6 mx-auto lg:pt-36 pt-32">
            {children}
        </main>
    </>
  )
}

import Header from '@/components/header/Header';
import getMetadataSite from '@/lib/queries/metadata/getMetadataSite';
import type { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ 
    params: { locale }
  }:  { 
    params: { locale: string }
  }): Promise<Metadata> {
  
    const [ dataResult ] = await Promise.allSettled([ getMetadataSite(locale) ]);
  
    if (dataResult.status === "rejected") return {}
  
    const metadata = dataResult.value.data
    const i18 = dataResult.value.i18
  
    const languages = {} as { [key: string]: string }
  
    i18.map(item => {
      const key = item.attributes.code
      languages[key] = (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/${key}`;
    })
  
    return {
      title: {
        template: `%s | ${metadata.abbreviation}`,
        default: metadata.title,
      },
      metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
      description: metadata.description,
      keywords: metadata.keywords.map(item => item.word),
      category: metadata.category,
      publisher: metadata.publisher,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        url: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
        siteName: metadata.title,
        images: metadata.image.data ? metadata.image.data.attributes.url : "https://hi.sfu-kras.ru/hero-image.jpeg",
        locale: locale,
        type: 'website',
      },
      alternates: {
        canonical: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
        languages: languages
      }
    }
  }

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className=''>
            <Header />
            <main className="flex flex-col items-center gap-12 container md:w-5/6 mx-auto lg:pt-36 pt-32">
                {children}
            </main>
        </div>
    ) 
}

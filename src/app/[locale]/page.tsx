import { dynamicContentQuery } from "@/lib/dynamicContentQuery";
import { notFound } from "next/navigation";
import ErrorHandler from "@/components/errors/ErrorHandler";
import DynamicZone from "@/components/dynamic-zone/DynamicZone";
import Header from "@/components/header/Header";
import Hero from "./(hero)/(client)/Hero";
import { MainPageT } from "@/lib/types/pages";
import fetchData from "@/lib/queries/fetchData";
import About from "./(hero)/About";
import Menu from "./(hero)/Menu";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import getMetadataSite from "@/lib/queries/metadata/getMetadataSite";
import type { Metadata } from "next";

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
      images: metadata.image.data ? metadata.image.data.attributes.url : "/hero-image.jpeg",
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
      languages: languages
    }
  }
}

export default async function Home({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {


  const getMainPage = async (locale: string): Promise<MainPageT> => {
      const query = /* GraphGL */ `
      query MainPage($locale: I18NLocaleCode) {
        mainPage(locale: $locale) {
          data {
            attributes {
              content {
                ${dynamicContentQuery}
              }
            }
          }
        }
      }
      `;

      const json = await fetchData<{ 
        data: { 
          mainPage: { 
            data: MainPageT 
          } 
        }; 
      }>({ 
          query, 
          error: "Failed to fetch Main Page",
          variables: {
            locale
          }
      })

      // await new Promise((resolve) => setTimeout(resolve, 2000))

      if (json.data.mainPage.data === null) notFound();
  
      const mainPage = MainPageT.parse(json.data.mainPage.data);
  
      return mainPage;
  };

  const [ dataResult ] = await Promise.allSettled([ getMainPage(locale) ]);
  
  return (
    <>
      <Hero 
        about={
          <Suspense fallback={
            <Skeleton className='w-full h-full flex items-center justify-center'>
              <Loader2 className='animate-spin'/>
            </Skeleton>
          }>
            <About/>
          </Suspense>
        }
        menu={
          <Suspense fallback={
            <Skeleton className='w-full h-full flex items-center justify-center'>
              <Loader2 className='animate-spin'/>
            </Skeleton>
          }>
            <Menu/>
          </Suspense>
        }
      />
      <Header />
      {dataResult.status !== "rejected"
        ? (
          <main className="flex flex-col items-center gap-12 container md:w-5/6 mx-auto lg:pt-36 pt-32">
            <div className='w-full -mt-16'>
              {dataResult.value.attributes.content.map((item, index) => (
                  <section id={item.link ? item.link : undefined} key={index}>
                      <DynamicZone item={item} searchParams={searchParams} headingBig />
                  </section>
              ))}
            </div>
          </main>
        )
        : <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Main Page"
            notFound={false}
          />
      }
    </>
  );
}

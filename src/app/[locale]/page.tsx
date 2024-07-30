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
import HeaderLoading from "@/components/loadings/main/HeaderLoading";

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
      <Suspense fallback={<HeaderLoading className="-mb-[76px]" />}>
        <Header />
      </Suspense>
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
        : (
          <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Main Page"
            notFound={false}
          />
        )
      }
    </>
  );
}

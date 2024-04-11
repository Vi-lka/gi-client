import { MainPageT } from "@/lib/types";
import { dynamicContentQuery } from "@/lib/dynamicContentQuery";
import { fetchData } from "@/lib/queries";
import { notFound } from "next/navigation";
import ErrorHandler from "@/components/errors/ErrorHandler";
import DynamicZone from "@/components/dynamic-zone/DynamicZone";
import Header from "@/components/header/Header";
import Hero from "./(hero)/Hero";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const headersList = headers();
  const header_locale = headersList.get('x-locale') || "";

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


  const [ dataResult ] = await Promise.allSettled([ getMainPage(header_locale) ]);
  
  return (
    <>
      <Hero />
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

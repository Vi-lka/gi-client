import { MainPageT } from "@/lib/types";
import { dynamicContentQuery } from "@/lib/dynamicContentQuery";
import { fetchData } from "@/lib/queries";
import { notFound } from "next/navigation";
import ErrorHandler from "@/components/errors/ErrorHandler";
import DynamicZone from "@/components/dynamic-zone/DynamicZone";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getMainPage = async (): Promise<MainPageT> => {
      const query = /* GraphGL */ `
      query MainPage {
        mainPage {
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
      })

      // await new Promise((resolve) => setTimeout(resolve, 2000))

      if (json.data.mainPage.data === null) notFound();
  
      const mainPage = MainPageT.parse(json.data.mainPage.data);
  
      return mainPage;
  };


  const [ dataResult ] = await Promise.allSettled([ getMainPage() ]);
  if (dataResult.status === "rejected") return (
      <ErrorHandler 
          error={dataResult.reason as unknown} 
          place="Main Page"
          notFound={false}
      />
  )
  
  return (
    <div className='w-full -mt-16'>
      {dataResult.value.attributes.content.map((item, index) => (
          <section id={item.link ? item.link : undefined} key={index} className='lg:pt-28 pt-20'>
              <DynamicZone item={item} searchParams={searchParams} headingBig />
          </section>
      ))}
    </div>
  );
}

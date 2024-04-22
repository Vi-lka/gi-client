import React from 'react'
import HorizontalAccordion from './HorizontalAccordion'
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { HeroAboutT } from '@/lib/types/additional';
import fetchData from '@/lib/queries/fetchData';
import { getLinks, getNavBar } from '@/lib/queries/additional';

export const dynamic = 'force-dynamic'

export default async function Hero() {

  const headersList = headers();
  const header_locale = headersList.get('x-locale') || "";

  const getHeroAbout = async (locale: string): Promise<HeroAboutT> => {
    const query = /* GraphGL */ `
      query HeroAbout($locale: I18NLocaleCode) {
        heroAbout(locale: $locale) {
          data {
            attributes {
              icons {
                data {
                  attributes {
                    url
                  }
                }
              }
              items {
                title
                iconReact
                description
              }
              link
              linkTitle
            }
          }
        }
      }
    `;

    const json = await fetchData<{ 
        data: { 
          heroAbout: { 
                data: {
                    attributes: HeroAboutT 
                } | null
            } 
        }; 
    }>({ 
        query, 
        error: "Failed to fetch Hero About",
        variables: {
            locale
        }
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    if (json.data.heroAbout.data === null) notFound();

    const heroAbout = HeroAboutT.parse(json.data.heroAbout.data.attributes);

    return heroAbout;
  };

  const [ 
    aboutResult,
    navBarResult,
    linksResult 
  ] = await Promise.allSettled([ 
    getHeroAbout(header_locale),
    getNavBar(header_locale),
    getLinks(header_locale) 
  ]);
  if (linksResult.status === "rejected") return (
    <ErrorHandler 
      error={linksResult.reason as unknown} 
      place="Links"
      notFound={false}
    />
  )

  return (
    <section id="top" className='relative 2xl:max-w-[2000px] xl:max-w-[1400px] lg:max-w-[1280px] md:max-w-[1024px] sm:max-w-[768px] w-11/12 mx-auto mt-6 z-50'>
      <HorizontalAccordion 
        aboutData={aboutResult.status !== "rejected" ? aboutResult.value : null} 
        menuData={{
          navBar: navBarResult.status !== "rejected" ? navBarResult.value : null,
          links: linksResult.value
        }} 
      /> 
    </section>
  )
}

import React from 'react'
import HorizontalAccordion from './HorizontalAccordion'
import { headers } from 'next/headers';
import { getDictionary } from '@/lib/getDictionary';
import { HeroAboutT, LinksT, NavBarT } from '@/lib/types';
import { fetchData } from '@/lib/queries';
import { notFound } from 'next/navigation';
import { dynamicContentLinksQuery } from '@/lib/dynamicContentQuery';
import ErrorHandler from '@/components/errors/ErrorHandler';

export const dynamic = 'force-dynamic'

export default async function Hero() {

  const headersList = headers();
  const header_locale = headersList.get('x-locale') || "";

  const dict = await getDictionary(header_locale);

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
                iconCustom
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

  const getNavBar = async (locale: string): Promise<NavBarT | null> => {
    const sameFields = `
      subLinks {
        title
        link
      }
    `
    const query = /* GraphGL */ `
    query NavBar($locale: I18NLocaleCode) {
      navBar(locale: $locale) {
        data {
          attributes {
            info { ${sameFields} }
            structure { ${sameFields} }
            education { ${sameFields} }
            entrance { ${sameFields} }
            dpo { ${sameFields} }
            science { ${sameFields} }
            projects { ${sameFields} }
            journals { ${sameFields} }
          }
        }
      }
    }
    `;

    const json = await fetchData<{ 
      data: { 
        navBar: { 
              data: {
                  attributes: NavBarT 
              } | null
          } 
      };
    }>({ 
        query, 
        error: "Failed to fetch NavBar",
        variables: {
          locale
        }
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    if (json.data.navBar.data === null) return null;

    const navBar = NavBarT.parse(json.data.navBar.data.attributes);

    return navBar;
  };

  const getLinks = async (locale: string): Promise<LinksT> => {
    const sameFields = `
      (locale: $locale) {
        data {
          attributes {
            title
            content {
              ${dynamicContentLinksQuery}
            }
          }
        }
      }
    `
    const query = /* GraphGL */ `
      query Links($locale: I18NLocaleCode) {
        entrancePage${sameFields}
        dpo${sameFields}
      }
    `;

    const json = await fetchData<{ 
        data: LinksT; 
    }>({ 
        query, 
        error: "Failed to fetch Links",
        variables: {
          locale
        }
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    if (json.data === null) notFound();

    const links = LinksT.parse(json.data);

    return links;
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
        dict={dict.Hero} 
        aboutData={aboutResult.status !== "rejected" ? aboutResult.value : null} 
        menuData={{
          navBar: navBarResult.status !== "rejected" ? navBarResult.value : null,
          links: linksResult.value
        }} 
      /> 
    </section>
  )
}

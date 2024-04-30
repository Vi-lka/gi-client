import React from 'react';
import { HeroAboutT } from '@/lib/types/additional';
import fetchData from '@/lib/queries/fetchData';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import AboutClient from './(client)/About.client';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { ClientHydration } from '@/components/ClientHydration';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

export default async function About() {

  const headersList = headers();
  const locale = headersList.get('x-locale') || "";

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
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                imageDark {
                  data {
                    attributes {
                      url
                    }
                  }
                }
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

    if (json.data.heroAbout.data === null) notFound();

    const heroAbout = HeroAboutT.parse(json.data.heroAbout.data.attributes);

    return heroAbout;
  };

  const [ dataResult ] = await Promise.allSettled([ getHeroAbout(locale) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="About Hero"
      notFound={false}
    />
  )

  return (
    <ClientHydration fallback={
      <Skeleton className='w-full h-full flex items-center justify-center'>
        <Loader2 className='animate-spin'/>
      </Skeleton>
    }>
      <AboutClient data={dataResult.value} />
    </ClientHydration>
  )
}

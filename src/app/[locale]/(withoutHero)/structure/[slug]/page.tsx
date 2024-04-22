import Anchors from '@/components/Anchors';
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi';
import Breadcrumbs from '@/components/Breadcrumbs';
import CarouselComp from '@/components/CarouselComp';
import { ClientHydration } from '@/components/ClientHydration';
import ImageComp from '@/components/ImageComp';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1, TypographyH2, TypographyH3 } from '@/components/typography';
import { Card, CardContent } from '@/components/ui/card';
import { CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import fetchData from '@/lib/queries/fetchData';
import { StructureSinglePageT } from '@/lib/types/pages';
import { calcWidth } from '@/lib/utils';
import { AtSign, Globe, Loader2, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'
import NextLink from "next/link";
import { FiPhone } from 'react-icons/fi';
import { getDictionary } from '@/lib/getDictionary';

export const dynamic = 'force-dynamic'

export default async function StructureSinglePage({
  params,
  searchParams,
}: { 
  params: { locale: string, slug: string },
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary(params.locale);

  const getStructureBySlug = async (locale: string, slug: string) => {
    const query = /* GraphGL */ `
      query Departments($locale: I18NLocaleCode, $filters: DepartmentFiltersInput,) {
        structure(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        departments(locale: $locale, filters: $filters) {
          data {
            id
            attributes {
              title
              slug
              media {
                data {
                  attributes { url }
                }
              }
              description_title
              description
              contacts {
                url
                email
                phone
                location
              }
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
        structure: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        departments: {
          data: StructureSinglePageT[]
        }
      }
    }>({ 
      query, 
      error: `Failed to fetch Department: ${slug}`, 
      variables: {
        locale,
        filters: {
          slug: {
            eqi: slug
          }
        }
      }
    })
      
    // await new Promise((resolve) => setTimeout(resolve, 2000))
      
    if (json.data.structure.data === null || json.data.departments.data.length === 0) notFound();

    const structureTitle = json.data.structure.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.structure.data.attributes.navBarConfig.navBarTitle
      : json.data.structure.data.attributes.title;
    
    const structure = StructureSinglePageT.parse(json.data.departments.data[0]);
    
    return { structureTitle, structure };
  };

  const [ dataResult ] = await Promise.allSettled([ getStructureBySlug(params.locale, params.slug) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place={`Structure (${params.slug})`}
      notFound
      goBack
    />
  )

  const media = dataResult.value.structure.attributes.media.data
  const description_title = dataResult.value.structure.attributes.description_title
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const description = dataResult.value.structure.attributes.description
  const contacts = dataResult.value.structure.attributes.contacts

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.structureTitle, slug: "structure" }, 
        { title: dataResult.value.structure.attributes.title, slug: params.slug }
      ]}/>

      <TypographyH1 className='font-semibold text-primary my-6 text-3xl'>
        {dataResult.value.structure.attributes.title}
      </TypographyH1>

      <Anchors data={dataResult.value.structure.attributes.content} />

      {media.length > 1
        ? (
          <div className='relative w-full h-fit my-6'>
            <ClientHydration fallback={<SliderLoading />}>
              <CarouselComp className='lg:-ml-8 -ml-4'>
                {media.map((item, index) => (
                  <CarouselItem key={index} className='lg:pl-8 pl-4'>
                    <Card className='border-none shadow-md bg-transparent rounded-3xl'>
                      <CardContent className="relative w-full max-h-96 aspect-[9/5]">
                        <ImageComp
                          src={item.attributes.url}
                          alt={item.attributes.url}
                          fill
                          sizes='100vw'
                          className='w-full object-cover rounded-3xl'
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselComp>
            </ClientHydration>
          </div>
        )
        : media[0] ? (
          <div className='relative w-full h-fit rounded-3xl overflow-hidden my-6'>
            <ClientHydration fallback={<Skeleton className='w-full h-full max-h-96'/>}>
              <ImageComp 
                src={media[0].attributes.url}
                alt=""
                fill
                sizes='100vw'
                className='!lg:absolute !relative object-cover max-h-96'
              />
            </ClientHydration>
          </div>
        )
        : null
      }

      {description_title && (
        <TypographyH2 className='font-semibold text-primary my-6'>
          {description_title}
        </TypographyH2>
      )}

      <div className='flex lg:flex-row flex-col gap-6'>
        {description && (
          <div className='lg:w-1/2 w-full'>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <BlocksRendererStrapi content={description} />
          </div>
        )}
        {contacts && (
          <div className='lg:w-1/2 w-full h-fit flex flex-col justify-center bg-primary dark:bg-accent text-background dark:text-foreground sm:px-12 px-8 sm:py-10 py-8 rounded-3xl'>
            <TypographyH3 className='text-background dark:text-foreground mb-6'>
              {dict.Entities.Structure.contacts}
            </TypographyH3>
            <ul className='flex flex-col gap-3 justify-center'>
              {contacts.url && (
                <li className='flex items-center gap-2 font-medium'>
                  <Globe className='w-auto h-5 ' />
                  <NextLink 
                    href={contacts.url}
                    target='__blank'
                    className='flex-1 hover:underline underline-offset-2'
                  >
                    {new URL(contacts.url).hostname}
                  </NextLink>
                </li>
              )}
              {contacts.email && (
                <li className='flex items-center gap-2 font-medium'>
                  <AtSign className='w-auto h-5 ' />
                  <NextLink 
                    href={`mailto:${contacts.phone}`} 
                    className='flex-1 hover:underline underline-offset-2'
                  >
                    {contacts.email}
                  </NextLink>
                </li>
              )}
              {contacts.phone && (
                <li className='flex items-center gap-2 font-medium'>
                  <FiPhone className='w-auto h-5 ' />
                  <NextLink 
                    href={`tel:${contacts.phone}`} 
                    className='flex-1 hover:underline underline-offset-2'
                  >
                    {contacts.phone}
                  </NextLink>
                </li>
              )}
              {contacts.location && (
                <li className='flex items-center gap-2 font-medium'>
                  <MapPin className='w-auto h-5 ' />
                  <NextLink 
                    href={`https://maps.yandex.ru/?text=${contacts.location}`} 
                    target='__blank'
                    className='flex-1 hover:underline underline-offset-2'
                  >
                    {contacts.location}
                  </NextLink>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {dataResult.value.structure.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}


function SliderLoading() {
  return (
    <div className='w-full relative max-h-96 aspect-[9/5]'>
      <Skeleton className='w-full h-full flex items-center justify-center'>
        <Loader2 className='animate-spin'/>
      </Skeleton>
      <Skeleton className="absolute md:w-8 md:h-8 w-6 h-6 rounded-full md:-left-12 -left-7 top-1/2 -translate-y-1/2" />
      <Skeleton className="absolute md:w-8 md:h-8 w-6 h-6 rounded-full md:-right-12 -right-7 top-1/2 -translate-y-1/2"/>
      <div className="my-4 flex w-16 items-center justify-center gap-1 max-w-full mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton 
            key={index}
            className="h-1.5 max-w-32 min-w-1"
            style={{
              width: calcWidth({index, current: 1, count: 3}) + "%"
            }}
          />
        ))}
      </div>
    </div>
  )
}
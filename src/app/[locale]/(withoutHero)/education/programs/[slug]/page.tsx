import Anchors from '@/components/Anchors';
import Breadcrumbs from '@/components/Breadcrumbs'
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import { TypographyH1 } from '@/components/typography'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { getDictionary } from '@/lib/getDictionary';
import fetchData from '@/lib/queries/fetchData';
import getMetadataEduEducationalProgram from '@/lib/queries/metadata/education/getMetadataEduEducationalProgram';
import { EducationalProgramPageT } from '@/lib/types/pages';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ 
  params: { locale, slug }
}:  { 
  params: { locale: string, slug: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataEduEducationalProgram(locale, slug) ]);

  if (dataResult.status === "rejected") {
    console.error(dataResult.reason)
    return {}
  }

  const metadata = dataResult.value

  return {
    title: metadata.title,
    openGraph: {
      title: metadata.title,
      images: metadata.image.data?.attributes.url ?? "/hero-image.jpeg",
      locale: locale,
    }
  }
}

export default async function EduEducationalProgramPage({ 
  params,
  searchParams,
}: { 
  params: { locale: string, slug: string },
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary(params.locale)

  const getEduEducationalProgramBySlug = async (locale: string, slug: string) => {
    const query = /* GraphGL */ `
      query EduEducationalPrograms($locale: I18NLocaleCode, $filters: EduEducationalProgramFiltersInput) {
        educationPage(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        eduEducationalPrograms(locale: $locale, filters: $filters) {
          data {
            id
            attributes {
              slug
              title
              type
              code
              mainName
              mainCode
              image {
                data {
                  attributes {
                    url
                  }
                }
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
        educationPage: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        eduEducationalPrograms: {
          data: EducationalProgramPageT[]
        }
      }
    }>({ 
      query, 
      error: `Failed to fetch Edu Educational Program: ${slug}`, 
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
    
    if (json.data.educationPage.data === null || json.data.eduEducationalPrograms.data.length === 0) notFound();
    
    const educationTitle = json.data.educationPage.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.educationPage.data.attributes.navBarConfig.navBarTitle
      : json.data.educationPage.data.attributes.title;
  
    const program = EducationalProgramPageT.parse(json.data.eduEducationalPrograms.data[0]);
  
    return { educationTitle, program };
  };
  

  const [ dataResult ] = await Promise.allSettled([ getEduEducationalProgramBySlug(params.locale, params.slug)]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place={`Edu Educational Program (${params.slug})`}
      notFound
      goBack
    />
  )

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.educationTitle, slug: "education" }, 
        { title: dict.EduEducationalProgramsPage.title, slug: "programs" },
        { title: dataResult.value.program.attributes.title, slug: params.slug }
      ]}/>

      <TypographyH1 className='font-semibold text-primary my-6 text-3xl'>
        {dataResult.value.program.attributes.title}
      </TypographyH1>

      <div className='flex gap-x-28 gap-y-3 flex-wrap text-sm text-primary'>
        <div className=''>
          <p>{dict.Entities.EducationalPrograms.mainCode}:</p>
          <p>
            {dataResult.value.program.attributes.mainCode} <span className="font-semibold">{dataResult.value.program.attributes.mainName}</span>
          </p>
        </div>
        <div className=''>
          <p>{dict.Entities.EducationalPrograms.code}:</p>
          <p>
            {dataResult.value.program.attributes.code} <span className="font-semibold">{dataResult.value.program.attributes.title}</span>
          </p>
        </div>
      </div>

      <Anchors data={dataResult.value.program.attributes.content} />

      {dataResult.value.program.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}

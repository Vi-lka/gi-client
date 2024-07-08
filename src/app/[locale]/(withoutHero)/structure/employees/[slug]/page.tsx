import Anchors from '@/components/Anchors'
import Breadcrumbs from '@/components/Breadcrumbs'
import ImageComp from '@/components/ImageComp'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import ErrorHandler from '@/components/errors/ErrorHandler'
import { TypographyH1 } from '@/components/typography'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery'
import fetchData from '@/lib/queries/fetchData'
import { EmployeeSinglePageT } from '@/lib/types/pages'
import { notFound } from 'next/navigation'
import React from 'react'
import Post from './Post'
import { ClientHydration } from '@/components/ClientHydration'
import { Skeleton } from '@/components/ui/skeleton'
import Contacts from './Contacts'
import { Badge } from '@/components/ui/badge'
import { getDictionary } from '@/lib/getDictionary'
import Link from '@/components/Link'
import { Metadata } from 'next'
import getMetadataEmployee from '@/lib/queries/metadata/structure/getMetadataEmployee'

export async function generateMetadata({ 
  params: { locale, slug }
}:  { 
  params: { locale: string, slug: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataEmployee(locale, slug) ]);

  if (dataResult.status === "rejected") return {}

  const metadata = dataResult.value

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description ? metadata.description : undefined,
      images: metadata.image.data?.attributes.url,
      locale: locale,
    }
  }
}

export default async function EmployeeSinglePage({
  params,
  searchParams,
}: {
  params: { locale: string, slug: string },
  searchParams: { [key: string]: string | string[] | undefined };
})  {

  const dict = await getDictionary(params.locale);

  const getEmployeeBySlug = async (locale: string, slug: string) => {
    const query = /* GraphGL */ `
      query EmployeeBySlug($locale: I18NLocaleCode, $filters: EmployeeFiltersInput,) {
        structure(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        employeesPage(locale: $locale) {
          data {
            attributes {
              title
              navBarConfig { navBarTitle }
            }
          }
        }
        employees(locale: $locale, filters: $filters) {
          data {
            attributes {
              title
              slug
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              meta {
                posts {
                  post
                  department {
                    data {
                      attributes {
                        slug
                        title
                        shortTitle
                      }
                    }
                  }
                }
                degree degreeShort
                rank rankShort
              }
              description
              phone
              email
              location
              hashtags {
                data {
                  id
                  attributes {
                    slug
                    title
                  }
                }
              }
              head_in_department {
                data {
                  id
                  attributes {
                    shortTitle
                    slug
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
        employeesPage: { 
          data: {
            attributes: { 
              title: string,
              navBarConfig: {
                navBarTitle: string | null
              } | null
            }
          } | null
        },
        employees: {
          data: EmployeeSinglePageT[]
        }
      }
    }>({ 
      query, 
      error: `Failed to fetch Employee: ${slug}`, 
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
      
    if (json.data.structure.data === null || json.data.employeesPage.data === null || json.data.employees.data.length === 0) notFound();

    const structureTitle = json.data.structure.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.structure.data.attributes.navBarConfig.navBarTitle
      : json.data.structure.data.attributes.title;

    const employeesTitle = json.data.employeesPage.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.employeesPage.data.attributes.navBarConfig.navBarTitle
      : json.data.employeesPage.data.attributes.title;
    
    const employee = EmployeeSinglePageT.parse(json.data.employees.data[0]);
    
    return { structureTitle, employeesTitle, employee };
  };

  const [ dataResult ] = await Promise.allSettled([ getEmployeeBySlug(params.locale, params.slug) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place={`Employee (${params.slug})`}
      notFound
      goBack
    />
  )

  const employee = dataResult.value.employee.attributes

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.structureTitle, slug: "structure" }, 
        { title: dataResult.value.employeesTitle, slug: "employees" },
        { title: employee.title, slug: params.slug }
      ]}/>

      <div className='grid lg:grid-cols-2 grid-cols-1 lg:gap-8 gap-3 mt-6'>
        <div className='w-full'>
          <TypographyH1 className='font-semibold text-primary lg:text-4xl text-3xl mb-3'>
            {employee.title}
          </TypographyH1>

          <Post locale={params.locale} employee={dataResult.value.employee} />

          {employee.description && (
            <p className='lg:text-base text-sm text-foreground dark:text-muted-foreground lg:mt-6 mt-3 whitespace-pre-wrap'>
              {employee.description}
            </p>
          )}

          {(employee.hashtags.data.length > 0) && (
            <ul className='inline-flex flex-wrap gap-2 lg:mt-6 mt-3'>
              {employee.hashtags.data.map(hashtag => (
                <Link
                  key={hashtag.id}
                  locale={params.locale}
                  href={`/structure/employees?hashtags=${hashtag.id}`}
                >
                  <Badge className='lg:text-sm text-xs hover:bg-transparent hover:text-primary dark:bg-accent dark:text-primary dark:hover:bg-transparent border border-border cursor-pointer transition-all'>
                    #{hashtag.attributes.title}
                  </Badge>
                </Link>
              ))}
            </ul>
          )}

          <div className='lg:block hidden mt-6'>
            <Contacts phone={employee.phone} email={employee.email} location={employee.location} contactsTitle={dict.Entities.Structure.contacts}/>
            <Anchors data={employee.content}/>
          </div>
        </div>

        <div className='relative w-full aspect-square overflow-hidden rounded-3xl'>
          <ClientHydration fallback={<Skeleton className='w-full h-full'/>}>
            <ImageComp 
              src={employee.image.data?.attributes.url}
              alt={employee.title}
              fill
              sizes='(max-width: 1024px) 100vw, 60vw'
              className='object-cover'
            />
          </ClientHydration>
        </div>

        <div className='lg:hidden block mt-3'>
          <Contacts phone={employee.phone} email={employee.email} location={employee.location} contactsTitle={dict.Entities.Structure.contacts}/>
          <Anchors data={employee.content}/>
        </div>
      </div>

      {employee.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}
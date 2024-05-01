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

export default async function EmployeeSinglePage({
  params,
  searchParams,
}: {
  params: { locale: string, slug: string },
  searchParams: { [key: string]: string | string[] | undefined };
})  {

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
                post
                degree degreeShort
                rank rankShort
              }
              description
              phone
              email
              location
              hashtags {
                data {
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

      <div className='grid lg:grid-cols-2 grid-cols-1 gap-8 mt-6'>
        <div className='w-full'>
          <TypographyH1 className='font-semibold text-primary mb-6 lg:text-4xl text-3xl'>
            {employee.title}
          </TypographyH1>

          <Anchors data={employee.content} />
        </div>

        <div className='relative w-full aspect-square overflow-hidden rounded-3xl'>
          <ImageComp 
            src={employee.image.data?.attributes.url}
            alt={employee.title}
            fill
            sizes='(max-width: 1024px) 100vw, 50vw'
            className='object-cover'
          />
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

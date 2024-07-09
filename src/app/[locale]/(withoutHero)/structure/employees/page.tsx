import Anchors from '@/components/Anchors'
import Breadcrumbs from '@/components/Breadcrumbs'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import ErrorHandler from '@/components/errors/ErrorHandler'
import { TypographyH1 } from '@/components/typography'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery'
import fetchData from '@/lib/queries/fetchData'
import { EmployeesPageT } from '@/lib/types/pages'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function EmployeesPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getEmployeesPage = async (locale: string) => {
    const query = /* GraphGL */ `
    query EmployeesPage($locale: I18NLocaleCode) {
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
          data: EmployeesPageT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Employees Page",
      variables: {
        locale
      }
    })
    // await new Promise((resolve) => setTimeout(resolve, 2000))
    if (json.data.structure.data === null || json.data.employeesPage.data === null) notFound();

    const structureTitle = json.data.structure.data.attributes.navBarConfig?.navBarTitle 
      ? json.data.structure.data.attributes.navBarConfig.navBarTitle
      : json.data.structure.data.attributes.title;
    

    const employeesPage = EmployeesPageT.parse(json.data.employeesPage.data);

    return { structureTitle, employeesPage };
  };

  const [ dataResult ] = await Promise.allSettled([ getEmployeesPage(locale) ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Employees Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.employeesPage.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.employeesPage.attributes.navBarConfig.navBarTitle 
    : dataResult.value.employeesPage.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: dataResult.value.structureTitle, slug: "structure" }, 
        { title: breadcrumbsTitle, slug: "employees" }
      ]} />
    
      <TypographyH1 className='font-semibold text-primary my-6'>
        {dataResult.value.employeesPage.attributes.title}
      </TypographyH1>
    
      <Anchors data={dataResult.value.employeesPage.attributes.content} />
    
      {dataResult.value.employeesPage.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}

import Breadcrumbs from '@/components/Breadcrumbs'
import { TypographyH1 } from '@/components/typography'
import React from 'react'
import ErrorHandler from '@/components/errors/ErrorHandler'
import DynamicZone from '@/components/dynamic-zone/DynamicZone'
import { notFound } from 'next/navigation'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery'
import Anchors from '@/components/Anchors'
import { ProjectsPageT } from '@/lib/types/pages'
import fetchData from '@/lib/queries/fetchData'

export default async function ProjectsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const getProjectsPage = async (): Promise<ProjectsPageT> => {
    const query = /* GraphGL */ `
      query ProjectsPage($locale: I18NLocaleCode) {
        projectsPage(locale: $locale) {
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
        projectsPage: { 
          data: ProjectsPageT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Projects Page",
      variables: {
        locale
      }
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    if (json.data.projectsPage.data === null) notFound();
    
    const projectsPage = ProjectsPageT.parse(json.data.projectsPage.data);
    
    return projectsPage;
  };
  

  const [ dataResult ] = await Promise.allSettled([ getProjectsPage() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Projects Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.attributes.navBarConfig.navBarTitle 
    : dataResult.value.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[{ title: breadcrumbsTitle, slug: "projects" }]} />

      <TypographyH1 className='font-semibold text-primary my-6'>
        {dataResult.value.attributes.title}
      </TypographyH1>

      <Anchors data={dataResult.value.attributes.content} />

      {dataResult.value.attributes.content.map((item, index) => (
        <section id={item.link ? item.link : undefined} key={index}>
          <DynamicZone item={item} searchParams={searchParams} />
        </section>
      ))}
    </div>
  )
}

import Anchors from '@/components/Anchors';
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ClientHydration } from '@/components/ClientHydration';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import ImageComp from '@/components/ImageComp';
import { TypographyH1 } from '@/components/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { getDictionary } from '@/lib/getDictionary';
import fetchData from '@/lib/queries/fetchData';
import getMetadataProject from '@/lib/queries/metadata/projects/getMetadataProject';
import { ProjectSinglePageT } from '@/lib/types/pages';
import { CalendarDays, CircleUser } from 'lucide-react';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

export async function generateMetadata({ 
  params: { locale, slug }
}:  { 
  params: { locale: string, slug: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataProject(locale, slug) ]);

  if (dataResult.status === "rejected") {
    console.error(dataResult.reason)
    return {}
  }

  const metadata = dataResult.value

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description ? metadata.description : undefined,
      images: metadata.image.data?.attributes.url ?? "/hero-image.jpeg",
      locale: locale,
    }
  }
}

export default async function ProjectSinglePage({ 
    params,
    searchParams,
}: { 
    params: { locale: string, slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const dict = getDictionary(params.locale)

    const getProjectBySlug = async (locale: string, slug: string) => {
        const query = /* GraphGL */ `
          query Project($locale: I18NLocaleCode, $filters: ProjectFiltersInput,) {
            projectsPage(locale: $locale) {
              data {
                attributes {
                  title
                  navBarConfig { navBarTitle }
                }
              }
            }
            projects(locale: $locale, filters: $filters) {
              data {
                id
                attributes {
                  title
                  slug
                  year
                  head {
                    title
                    link
                  }
                  image {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  text
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
                    data: {
                        attributes: { 
                          title: string,
                          navBarConfig: {
                            navBarTitle: string | null
                          } | null
                        }
                    } | null
                },
                projects: {
                    data: ProjectSinglePageT[]
                }
            }
        }>({ 
            query, 
            error: `Failed to fetch Project: ${slug}`, 
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
        
        if (json.data.projectsPage.data === null || json.data.projects.data.length === 0) notFound();

        const projectsPageTitle = json.data.projectsPage.data.attributes.navBarConfig?.navBarTitle
          ? json.data.projectsPage.data.attributes.navBarConfig.navBarTitle
          : json.data.projectsPage.data.attributes.title;
      
        const project = ProjectSinglePageT.parse(json.data.projects.data[0]);
      
        return { projectsPageTitle, project };
    };

    const [ dataResult ] = await Promise.allSettled([ getProjectBySlug(params.locale, params.slug) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place={`Project (${params.slug})`}
            notFound
            goBack
        />
    )

    const project = dataResult.value.project.attributes

    return (
      <div className='w-full'>
        <Breadcrumbs data={[
          { title: dataResult.value.projectsPageTitle, slug: "projects" },
          { title: project.title, slug: params.slug }
        ]}/>
  
        <div className='mt-6'>
          <div className='lg:w-1/3 lg:float-right lg:ml-8'>
            <div className='relative aspect-video overflow-hidden rounded-3xl mb-3'>
              <ClientHydration fallback={<Skeleton className='w-full h-full'/>}>
                <ImageComp 
                  src={project.image.data?.attributes.url}
                  alt={project.title}
                  fill
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  className='object-cover'
                />
              </ClientHydration>
            </div>

            {(project.year || project.head) && (
              <div className='flex flex-wrap gap-2 items-center justify-between mb-6'>
                <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
                  <CalendarDays className='w-auto h-5' />
                  <p className='flex-1'>{project.year + " " + (await dict).Entities.Projects.year}</p>
                </div>
                {project.head && (
                  <div className='flex items-center gap-2 dark:text-muted-foreground font-medium'>
                    <CircleUser className='w-auto h-5' />
                    {project.head.link ? (
                      <NextLink 
                        href={project.head.link}
                        target='__blank'
                        className='flex-1 hover:underline underline-offset-2 hover:underline-offset-4 transition-all transform-gpu duration-300'
                      >{project.head.title}</NextLink>
                    ) : (
                      <p className='flex-1'>{project.head.title}</p>
                    )}
                  </div>
                )}
              </div>
            )}
  
            <Anchors data={project.content} className='mb-6 lg:flex hidden'/>
          </div>
  
          <div className=''>
            <TypographyH1 className='font-semibold text-primary lg:text-4xl sm:text-3xl text-2xl mb-3'>
              {project.title}
            </TypographyH1>
  
            <Anchors data={project.content} className='mb-6 lg:hidden'/>
            
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
            <BlocksRendererStrapi content={project.text} />
          </div>
        </div>
  
        <div className='w-full lg:float-left'>
          {project.content.map((item, index) => (
            <section id={item.link ? item.link : undefined} key={index}>
              <DynamicZone item={item} searchParams={searchParams} />
            </section>
          ))}
        </div>
      </div>
    )
}

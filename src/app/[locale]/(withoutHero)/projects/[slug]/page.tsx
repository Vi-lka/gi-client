import Anchors from '@/components/Anchors';
import BlocksRendererStrapi from '@/components/BlocksRendererStrapi';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ClientHydration } from '@/components/ClientHydration';
import DynamicZone from '@/components/dynamic-zone/DynamicZone';
import ErrorHandler from '@/components/errors/ErrorHandler';
import ImageComp from '@/components/ImageComp';
import MoreButton from '@/components/MoreButton';
import { TypographyH1, TypographyH2 } from '@/components/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { dynamicContentQuery } from '@/lib/dynamicContentQuery';
import { getDictionary } from '@/lib/getDictionary';
import fetchData from '@/lib/queries/fetchData';
import getMetadataProject from '@/lib/queries/metadata/projects/getMetadataProject';
import { ProjectSinglePageT } from '@/lib/types/pages';
import { CalendarDays, ChevronRight, CircleUser } from 'lucide-react';
import type { Metadata } from 'next';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import MembersArray from './MembersArray';

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

    const dict = await getDictionary(params.locale)

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
                  image {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  text
                  head {
                    title
                    link
                    description
                    image {
                      data {
                        attributes {
                          url
                        }
                      }
                    }
                  }
                  members {
                    ...on ComponentProjectsProjectMember {
                      __typename
                      description
                      member {
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
                        	} 
                        }
                      }
                    }
                    ...on ComponentProjectsProjectMemberOutSide {
                      __typename
                      title
                      description
                      link
                      image {
                        data {
                          attributes {
                            url
                          }
                        }
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
                  <p className='flex-1'>{project.year + " " + dict.Entities.Projects.year}</p>
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

        {project.head && (
          <div className='w-full lg:pt-28 pt-20'>
            <TypographyH2 className='font-semibold text-primary mb-6 border-none'>
              {dict.Entities.Projects.head}
            </TypographyH2>
            <Card className='h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
              <CardContent className="relative w-full h-full flex lg:flex-row flex-col lg:items-center xl:gap-8 gap-6 xl:px-8 p-6 overflow-hidden">
                <ClientHydration fallback={<Skeleton className='rounded-full aspect-square w-32 lg:mx-0 mx-auto'/>}>
                  {project.head.link 
                    ? (
                      <NextLink href={project.head.link} target='__blank'>
                        <ImageComp
                          src={project.head.image.data?.attributes.url}
                          alt="Image"
                          fill={false}
                          width={128}
                          height={128}
                          className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                        />
                      </NextLink>
                    ) : (
                      <ImageComp 
                        src={project.head.image.data?.attributes.url}
                        alt="Image"
                        fill={false}
                        width={128}
                        height={128}
                        className='object-cover rounded-full aspect-square max-h-32 lg:mx-0 mx-auto'
                      />
                    )
                  }
                </ClientHydration>

                  <div className='h-full flex flex-col flex-1 lg:justify-center gap-4 text-primary'>
                    <div className='lg:mt-auto lg:pt-3'>
                      {project.head.link 
                        ? (
                          <NextLink href={project.head.link} className='w-fit' target='__blank'>
                            <h4 className='text-lg font-bold line-clamp-5 md:translate-y-1.5 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                              {project.head.title}
                            </h4>
                          </NextLink>  
                        ) : (
                          <h4 className='text-lg font-bold line-clamp-5 md:translate-y-1.5 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                            {project.head.title}
                          </h4>
                        )
                      }
                    </div>   
                    {project.head.description && (
                      <p className='text-sm text-foreground dark:text-muted-foreground lg:line-clamp-3 line-clamp-5 whitespace-pre-wrap'>
                        {project.head.description}
                      </p>
                    )}
                    {project.head.link && (
                      <div className='w-full flex mt-auto'>
                        <MoreButton 
                          href={project.head.link}
                          target='__blank'
                          variant="link"
                          className='h-6 p-0 text-xs'
                        >
                          <ChevronRight size={20} />
                        </MoreButton>
                      </div>
                    )}
                  </div>
              </CardContent>
            </Card>
          </div>
        )}

        <MembersArray dict={dict} locale={params.locale} data={project.members} />
  
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

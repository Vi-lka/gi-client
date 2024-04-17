import { fetchData } from '@/lib/queries';
import type { CustomIconEnum, ImageT } from '@/lib/types';
import { FooterT } from '@/lib/types';
import { notFound } from 'next/navigation';
import React from 'react'
import ErrorHandler from '../errors/ErrorHandler';
import { TypographyH2 } from '../typography';
import IconCustom from '../IconCustom';
import DynamicReactIcon from '../DynamicReactIcon';
import ImageComp from '../ImageComp';
import Link from 'next/link';
import FormFooter from './FormFooter';
import { headers } from 'next/headers';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic'

export default async function Footer() {

    const headersList = headers();
    const header_locale = headersList.get('x-locale') || "";

    const getFooter = async (locale: string): Promise<FooterT> => {
        const query = /* GraphGL */ `
        query Footer($locale: I18NLocaleCode) {
            footer(locale: $locale) {
              data {
                attributes {
                  title
                  subtitle
                  socialNetworks {
                    link
                    iconReact
                    image {data { attributes { url } }}
                    imageDark {data { attributes { url } }}
                  }
                  contacts { title phone email location iconCustom iconReact }
                  logos {
                    link
                    image {data { attributes { url } }}
                    imageDark {data { attributes { url } }}
                  }
                  copyright
                }
              }
            }
        }
        `;

        const json = await fetchData<{ 
            data: { 
                footer: { 
                    data: {
                        attributes: FooterT 
                    } | null
                } 
            }; 
        }>({ 
            query, 
            error: "Failed to fetch Footer",
            variables: {
                locale
            }
        })

        // await new Promise((resolve) => setTimeout(resolve, 2000))

        if (json.data.footer.data === null) notFound();
    
        const footer = FooterT.parse(json.data.footer.data.attributes);
    
        return footer;
    };

    const [ dataResult ] = await Promise.allSettled([ getFooter(header_locale) ]);
    if (dataResult.status === "rejected") return (
        <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Footer"
            notFound={false}
        />
    )
    const year = new Date().getFullYear();

    return (
        <footer className="bg-background lg:pt-36 sm:pt-32 pt-24 pb-8">
            <div className="container md:w-5/6 mx-auto">
                {dataResult.value.title && (
                    <TypographyH2 className='font-semibold text-primary mb-1 border-none'>
                        {dataResult.value.title}
                    </TypographyH2>
                )}
                {dataResult.value.subtitle && (
                    <p className='mt-0 mb-6'>
                        {dataResult.value.subtitle}
                    </p>
                )}

                <div className="flex lg:flex-row flex-col items-start justify-between xl:gap-28 lg:gap-20 sm:gap-12 gap-8 flex-wrap">
                    <section className="lg:w-1/4 w-full">
                        <FormFooter 
                            formTitle={dataResult.value.title} 
                            formDescription={dataResult.value.subtitle}
                        />
                    </section>

                    <section className='flex-1 lg:w-auto w-full'>
                        <div className='flex xl:flex-row flex-col justify-between sm:items-start items-center xl:gap-[15%] gap-8'>
                            <ul className='xl:grid grid-rows-3 grid-flow-col flex flex-row flex-wrap gap-4'>
                                {dataResult.value.socialNetworks.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link} target='__blank' className='w-fit h-fit hover:opacity-90 transition-all' >
                                            <SocialIcon {...item}/>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <ul className='grid sm:grid-cols-2 grid-cols-1 sm:gap-10 gap-6 justify-between flex-1'>
                                {dataResult.value.contacts.map((item, index) => (
                                    <li key={index} className='flex gap-3'>
                                        <ContactsIcon {...item}/>
                                        <div className='flex-1 text-sm flex flex-col gap-0.5'>
                                            {item.title && <p className='font-medium'>{item.title}</p>}
                                            {item.phone && (
                                                <Link 
                                                    href={`tel:${item.phone}`} 
                                                    className='hover:underline underline-offset-2'
                                                >
                                                    {item.phone}
                                                </Link>
                                            )}
                                            {item.email && (
                                                <Link 
                                                    href={`mailto:${item.email}`} 
                                                    className='hover:underline underline-offset-2'
                                                >
                                                    {item.email}
                                                </Link>  
                                            )}
                                            {item.location && (
                                                <Link 
                                                    href={`https://maps.yandex.ru/?text=${item.location}`}
                                                    target="_blank"
                                                    className='hover:underline underline-offset-2'
                                                >
                                                    {item.location}
                                                </Link>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='mt-8 flex items-center xl:gap-10 gap-6 sm:justify-between justify-center flex-wrap'>
                            {dataResult.value.logos.map((item, index) => (
                                item.link 
                                    ? (
                                        <Link 
                                            key={index}
                                            href={item.link}
                                            target="_blank"
                                            className='hover:underline underline-offset-2'
                                        >
                                            <ImageComp 
                                                src={item.image.data?.attributes.url}
                                                alt='Logo'
                                                fill={false}
                                                width={140}
                                                height={140}
                                                className={cn(
                                                    'object-contain xl:w-[140px] w-24',
                                                    item.imageDark.data ? "dark:hidden" : "dark:!filter-background"
                                                )}
                                            />
                                            {item.imageDark.data && (
                                                <ImageComp 
                                                    src={item.imageDark.data.attributes.url}
                                                    alt='Logo'
                                                    fill={false}
                                                    width={140}
                                                    height={140}
                                                    className='object-contain xl:w-[140px] w-24 hidden dark:block'
                                                />
                                            )}
                                        </Link>
                                    )
                                    : (
                                        <div key={index}>
                                            <ImageComp 
                                                src={item.image.data?.attributes.url}
                                                alt='Logo'
                                                fill={false}
                                                width={140}
                                                height={140}
                                                className={cn(
                                                    'object-contain xl:w-[140px] w-24',
                                                    item.imageDark.data ? "dark:hidden" : "dark:!filter-background"
                                                )}
                                            />
                                            {item.imageDark.data && (
                                                <ImageComp 
                                                    src={item.imageDark.data.attributes.url}
                                                    alt='Logo'
                                                    fill={false}
                                                    width={140}
                                                    height={140}
                                                    className='object-contain xl:w-[140px] w-24 hidden dark:block'
                                                />
                                            )}
                                        </div>
                                    )
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {dataResult.value.copyright && (
                <div className="container md:w-5/6 mx-auto xl:mt-16 mt-12">
                    <p className="lg:text-sm text-xs font-medium text-muted">
                        © {year} {dataResult.value.copyright}
                    </p>
                </div>
            )}
        </footer>
    )
}

function SocialIcon({
    iconReact,
    image,
    imageDark,
}: {
    iconReact: string | null,
    image: ImageT,
    imageDark: ImageT,
}) {
    if (iconReact) return <DynamicReactIcon icon={iconReact} className="w-auto xl:h-9 h-8 text-primary rounded-full" />
    else if (image.data) return (
        <div>
            <ImageComp 
                src={image.data.attributes.url} 
                alt='Social Network Icon' 
                fill={false} 
                width={80} 
                height={80} 
                className={cn(
                    'object-contain w-fit xl:h-9 h-8 rounded-full',
                    imageDark.data ? "dark:hidden" : "dark:!filter-background"
                )}
            />
            {imageDark.data && (
                <ImageComp 
                    src={imageDark.data.attributes.url} 
                    alt='Social Network Icon' 
                    fill={false} 
                    width={80} 
                    height={80} 
                    className='object-contain w-fit xl:h-9 h-8 rounded-full hidden dark:block'
                />
            )}
        </div>
    )
}

function ContactsIcon({
    iconReact,
    iconCustom,
}: {
    iconReact: string | null,
    iconCustom: CustomIconEnum | null,
}) {
    if (iconCustom) return <IconCustom icon={iconCustom} className='w-auto h-6 filter-primary' />
    else if (iconReact) return <DynamicReactIcon icon={iconReact} className="w-auto h-6 text-primary" />
    else return null
}

import Breadcrumbs from '@/components/Breadcrumbs'
import { TypographyH1 } from '@/components/typography'
import React, { Suspense } from 'react'
import ErrorHandler from '@/components/errors/ErrorHandler'
import { notFound } from 'next/navigation'
import { dynamicContentQuery } from '@/lib/dynamicContentQuery'
import Anchors from '@/components/Anchors'
import { EducationPageT } from '@/lib/types/pages'
import fetchData from '@/lib/queries/fetchData'
import { getEduEducationalPrograms } from '@/lib/queries/educational-programs'
import EducationalProgramsItem from '@/components/dynamic-zone/blocks/entities-cards/EducationalProgramsItem'
import EducationalProgramsLoading from '@/components/loadings/EducationalProgramsLoading'
import { ClientHydration } from '@/components/ClientHydration'
import TabsComp from '@/components/TabsComp'
import SearchField from '@/components/filters/SearchField'
import DepartmentsFilter from '@/components/filters/entities/DepartmentsFilter'
import { getDictionary } from '@/lib/getDictionary'
import type { EducationalProgramSingleT } from '@/lib/types/entities'

export default async function EduEducationalProgramsPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const dict = await getDictionary(locale)

  const search = searchParams["search_eduProg"] as string | undefined;
  const departmentsParam = searchParams["departments"] as string | undefined;
  

  const getEducationPage = async (): Promise<EducationPageT> => {
    const query = /* GraphGL */ `
      query EducationPage($locale: I18NLocaleCode) {
        educationPage(locale: $locale) {
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
        educationPage: { 
          data: EducationPageT 
        } 
      }; 
    }>({ 
      query, 
      error: "Failed to fetch Education Page",
      variables: {
        locale
      }
    })

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    if (json.data.educationPage.data === null) notFound();
    
    const educationPage = EducationPageT.parse(json.data.educationPage.data);
    
    return educationPage;
  };
  

  const [ dataResult ] = await Promise.allSettled([ getEducationPage() ]);
  if (dataResult.status === "rejected") return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Education Page"
      notFound={false}
    />
  )

  const breadcrumbsTitle = dataResult.value.attributes.navBarConfig?.navBarTitle 
    ? dataResult.value.attributes.navBarConfig.navBarTitle 
    : dataResult.value.attributes.title

  return (
    <div className='w-full'>
      <Breadcrumbs data={[
        { title: breadcrumbsTitle, slug: "education" }, 
        { title: dict.EduEducationalProgramsPage.title, slug: "programs" }
      ]} />

      <TypographyH1 className='font-semibold text-primary my-6'>
        {dict.EduEducationalProgramsPage.title}
      </TypographyH1>

      <Anchors data={dataResult.value.attributes.content} />

      <div className='w-full pt-4'>
        <div className='flex sm:flex-row flex-col gap-3 items-center mb-6'>
            <div className='sm:w-1/2 w-full'>
              <SearchField placeholder={dict.Inputs.search} param='search_edueduProg' className='' />
            </div>
            <div className='sm:w-1/2 w-full'>
              <DepartmentsFilter searchParams={searchParams} />
            </div>
        </div>
        <Suspense 
          key={`search_edueduProg=${search}&departments=${departmentsParam}`} 
          fallback={<EducationalProgramsLoading />}
        >
          <EducationalProgramsAllContent locale={locale} dict={dict} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}

async function EducationalProgramsAllContent({
    locale,
    dict,
    searchParams,
}: {
    locale: string,
    dict: Dictionary,
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const search = searchParams["search_edueduProg"] as string | undefined;
    const departmentsParam = searchParams["departments"] as string | undefined;

    const departments = departmentsParam?.split("_or_")

    const sameParams = { locale, search, departments }
    const [ 
        bachelorsResult,
        magistracyResult,
        postgraduateResult
    ] = await Promise.allSettled([
        getEduEducationalPrograms({ ...sameParams, type: "bachelor" }),
        getEduEducationalPrograms({ ...sameParams, type: "magistracy" }),
        getEduEducationalPrograms({ ...sameParams, type: "postgraduate" }),
    ]);

    const bachelors = bachelorsResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={bachelorsResult.reason as unknown}
                    place="Bachelor"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid locale={locale} buttonTitle={dict.Buttons.more} data={bachelorsResult.value.data} />,
            count: bachelorsResult.value.meta.pagination.total
        }

    const magistracy = magistracyResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={magistracyResult.reason as unknown}
                    place="Magistracy"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid locale={locale} buttonTitle={dict.Buttons.more} data={magistracyResult.value.data} />,
            count: magistracyResult.value.meta.pagination.total
        }

    const postgraduate = postgraduateResult.status === "rejected" 
        ? {
            content:
                <ErrorHandler
                    error={postgraduateResult.reason as unknown}
                    place="Postgraduate"
                    notFound={false}
                />,
            count: 0
        }
        : {
            content: <EducationalProgramsGrid locale={locale} buttonTitle={dict.Buttons.more} data={postgraduateResult.value.data} />,
            count: postgraduateResult.value.meta.pagination.total
        }

    const tabs = [
        {
            value: "bachelor",
            title: dict.Entities.EducationalPrograms.bachelor,
            content: bachelors.content,
            count: bachelors.count
        },
        {
            value: "magistracy",
            title: dict.Entities.EducationalPrograms.magistracy,
            content: magistracy.content,
            count: magistracy.count
        },
        {
            value: "postgraduate",
            title: dict.Entities.EducationalPrograms.postgraduate,
            content: postgraduate.content,
            count: postgraduate.count
        },
    ]

    if (bachelors.count === 0 && magistracy.count === 0 && postgraduate.count === 0) {
        return (
            <ErrorHandler
                error={Error("NEXT_NOT_FOUND")}
                place={dict.Entities.EducationalPrograms.title}
                notFound
                goBack={false}
            />
        )
    }

    return (
        <ClientHydration fallback={<EducationalProgramsLoading />}>
            <TabsComp tabs={tabs} />
        </ClientHydration>
    )
}

function EducationalProgramsGrid({
    locale,
    data,
    buttonTitle
}: {
    locale: string,
    data: EducationalProgramSingleT[],
    buttonTitle: string,
}) {
    
    return (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 auto-rows-fr lg:gap-8 gap-6">
            {data.map(item => (
                <EducationalProgramsItem 
                  key={"edu-edu-program" + item.id} 
                  locale={locale} 
                  item={item} 
                  buttonTitle={buttonTitle} 
                  parentLink="education/programs"
                />
            ))}
        </div>
    )
}
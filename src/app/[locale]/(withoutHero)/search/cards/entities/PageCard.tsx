import Link from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { 
  DpoPageT, 
  EducationPageT, 
  EmployeesPageT, 
  EntrancePageT, 
  EventsPageT, 
  InfoPageT, 
  JournalsPageT, 
  MainPageT, 
  NewsPageT, 
  PageTypeNameEnum, 
  ProjectsPageT, 
  StructurePageT 
} from '@/lib/types/pages'
import { findElementRecursive } from '@/lib/utils'
import React from 'react'
import { FindedElement } from '../FindedElement'

type DataT = 
  MainPageT | 
  EntrancePageT | 
  DpoPageT | 
  StructurePageT | 
  EmployeesPageT | 
  InfoPageT | 
  NewsPageT |
  EventsPageT |
  EducationPageT |
  ProjectsPageT |
  JournalsPageT

export default function PageCard({
  locale,
  dict,
  data,
  searchTerm
}: {
  locale: string
  dict: Dictionary,
  data: DataT,
  searchTerm: string,
}) {
  if (!data.attributes.slug) return null

  function getPageTitle(typename: PageTypeNameEnum | undefined) {
    switch (typename) {
      case "MainPageEntity":
        return dict.Header.nav.main;
      case "EntrancePageEntity":
        return dict.Header.nav.admission;
      case "DpoEntity":
        return dict.Header.nav.dpo;
      case "StructureEntity":
        return dict.Header.nav.structure;
      case "EmployeesPageEntity":
        return dict.Header.nav.employees;
      case "InfoEntity":
        return dict.Header.nav.info;
      case "NewsPageEntity":
        return dict.Header.nav.news;
      case "EventsPageEntity":
        return dict.Header.nav.events;
      case "EducationPageEntity":
        return dict.Header.nav.education;
      case "ProjectsPageEntity":
        return dict.Header.nav.projects;
      case "JournalsPageEntity":
        return dict.Header.nav.journals;

      default:
        return "";
    }
  }

  const findedElements = findElementRecursive(data.attributes.content, searchTerm)

  const firstAnchor = ((findedElements.length > 0) && findedElements[0].element.link)
    ? "#" + findedElements[0].element.link 
    : ""
  const href = data.attributes.slug

  return (
    <Card key={"page_" + data.__typename + Math.random().toString()} className='min-w-0 h-full group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
      <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
        <div className='flex-1 lg:w-[55%] w-full flex flex-col gap-6 justify-between text-primary'>
          <div>
            <Link locale={locale} href={href + firstAnchor} className='w-fit'>
              <h4 className='xl:text-xl lg:text-lg sm:text-xl text-lg font-bold line-clamp-5 md:translate-y-1 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                {getPageTitle(data.__typename)}
              </h4>
            </Link>

            <div className='mt-6 space-y-4'>
              {findedElements.map((item, indx) => (
                <FindedElement 
                  key={indx} 
                  locale={locale}
                  text={item.text} 
                  href={`${href}#${item.element.link}`} 
                  searchTerm={searchTerm} 
                  count={findedElements.length}
                  separator={(findedElements.length > 1) && (indx+1 !== findedElements.length)}
                />
              ))}
            </div>
          </div>

          <div className='w-full flex flex-col gap-6 justify-end'>
            <Link locale={locale} href={href + firstAnchor} className='w-fit sm:ml-auto sm:mr-0 ml-auto mr-auto'>
              <Button className='uppercase font-medium px-10 py-5 rounded-3xl'>
                {dict.Buttons.more}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card> 
  )
}

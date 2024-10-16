import Link from '@/components/Link'
import { Card, CardContent } from '@/components/ui/card'
import { DynamicZoneT } from '@/lib/types/components'
import type { 
  DepartmentsSearchT,
  DpoCourseSearchT, 
  EducationalProgramSearchT, 
  EduEducationalProgramSearchT, 
  EmployeeSearchT,
  EventSearchT,
  JournalSearchT,
  NewsSearchT,
  ProjectSearchT
} from '@/lib/types/search-all'
import { findElementRecursive } from '@/lib/utils'
import React from 'react'
import { FindedElement } from '../FindedElement'
import { Button } from '@/components/ui/button'

type DataT = 
  EducationalProgramSearchT |
  EduEducationalProgramSearchT |
  DpoCourseSearchT |
  DepartmentsSearchT |
  EmployeeSearchT |
  EventSearchT |
  NewsSearchT |
  ProjectSearchT |
  JournalSearchT

export default function SingleEntity({
  locale,
  dict,
  data,
  searchTerm,
  parentHref
}: {
  locale: string
  dict: Dictionary,
  data: DataT,
  searchTerm: string,
  parentHref: string,
}) {
  const {content, ...rest} = data.attributes

  const findedElements = findElementRecursive([rest, ...content], searchTerm)

  const elementFromContent = (findedElements.length > 0) && DynamicZoneT.safeParse(findedElements[0].element).success 
    ? findedElements[0].element as DynamicZoneT
    : null

  const firstAnchor = elementFromContent?.link
    ? "#" + elementFromContent.link 
    : ""
  const href = parentHref + data.attributes.slug

  return (
    <Card key={"edu_program" + data.__typename + Math.random().toString()} className='min-w-0 group/card border-transparent dark:border-border/20 dark:hover:border-border hover:shadow-lg shadow-md rounded-3xl transition duration-300'>
      <CardContent className="w-full h-full flex lg:flex-row flex-col xl:gap-8 gap-6 justify-between p-3">
        <div className='flex-1 lg:w-[55%] w-full flex flex-col gap-6 justify-between text-primary'>
          <div>
            <Link locale={locale} href={href + firstAnchor} className='w-fit'>
              <h4 className='xl:text-xl lg:text-lg sm:text-xl text-lg font-bold line-clamp-5 md:translate-y-1 group-hover/card:translate-y-0 transition duration-300 transform-gpu'>
                {data.attributes.title}
              </h4>
            </Link>

            <div className='mt-6 space-y-4'>
              {findedElements.map((item, indx) => (
                <FindedElement 
                  key={indx} 
                  locale={locale}
                  text={item.text} 
                  href={`${href}#${(item.element as DynamicZoneT).link ?? ""}`} 
                  count={findedElements.length}
                  searchTerm={searchTerm} 
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
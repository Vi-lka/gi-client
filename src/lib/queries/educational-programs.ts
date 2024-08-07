"use server"

import { notFound } from "next/navigation";
import type { EducationalProgramTypeEnum} from "../types/entities";
import { EducationalProgramsT } from "../types/entities";
import fetchData from "./fetchData";
import { genSearchFilter } from "../utils";

//.........................Educational Programs.........................//
export const getEducationalPrograms = async ({
  locale,
  page,
  pageSize,
  type = "",
  sort = "order:asc",
  search,
  filterBy,
  departments
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  type?: EducationalProgramTypeEnum | ""
  sort?: string;
  search?: string;
  filterBy?: string;
  departments?: string[]
}): Promise<EducationalProgramsT> => {
  const query = /* GraphGL */ `
    query EducationalPrograms($locale: I18NLocaleCode, $sort: [String], $pagination: PaginationArg, $filters: EducationalProgramFiltersInput) {
      educationalPrograms(locale: $locale, sort: $sort, pagination: $pagination, filters: $filters) {
        meta {
          pagination {
            total
          }
        }
        data {
          id
          attributes {
            slug
            title
            type
            code
            mainName
            mainCode
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
  `;

  const connectedFilter = (filterBy && filterBy.length > 0) 
    ? {
      or: [
        {department: {
          slug: { eqi: filterBy }
        }},
        {employees: {
          slug: { eqi: filterBy }
        }},
        {events: {
          slug: { eqi: filterBy }
        }}
      ]
    } : undefined;

  const searchFilter = genSearchFilter(
    "containsi",
    search,
    {or: [
      {title: {
        containsi: search
      }},
      {code: {
        containsi: search
      }},
      {mainName: {
        containsi: search
      }},
      {mainCode: {
        containsi: search
      }},
      {department: {
        title: { containsi: search }
      }}
    ]}
  )
  
  const json = await fetchData<{ data: { educationalPrograms: EducationalProgramsT }; }>({ 
    query, 
    error: "Failed to fetch Educational Programs", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        type: {
          containsi: type
        },
        department: departments ? {
          id: { in: departments }
        } : undefined,
        and: [
          {...connectedFilter},
          {or: searchFilter}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.educationalPrograms.meta.pagination.total === 0 ||
    json.data.educationalPrograms.data.length === 0
  ) {
    notFound();
  }

  const educationalPrograms = EducationalProgramsT.parse(json.data.educationalPrograms);

  return educationalPrograms;
};




//.........................Edu Educational Programs.........................//
export const getEduEducationalPrograms = async ({
  locale,
  page,
  pageSize,
  type = "",
  sort = "order:asc",
  search,
  filterBy,
  departments
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  type?: EducationalProgramTypeEnum | ""
  sort?: string;
  search?: string;
  filterBy?: string;
  departments?: string[]
}): Promise<EducationalProgramsT> => {
  const query = /* GraphGL */ `
    query EduEducationalPrograms($locale: I18NLocaleCode, $sort: [String], $pagination: PaginationArg, $filters: EduEducationalProgramFiltersInput) {
      eduEducationalPrograms(locale: $locale, sort: $sort, pagination: $pagination, filters: $filters) {
        meta {
          pagination {
            total
          }
        }
        data {
          id
          attributes {
            slug
            title
            type
            code
            mainName
            mainCode
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
  `;

  const connectedFilter = (filterBy && filterBy.length > 0) 
    ? {
      or: [
        {department: {
          slug: { eqi: filterBy }
        }},
        {employees: {
          slug: { eqi: filterBy }
        }},
        {events: {
          slug: { eqi: filterBy }
        }}
      ]
    } : undefined;

  const searchFilter = genSearchFilter(
    "containsi",
    search,
    {or: [
      {title: {
        containsi: search
      }},
      {code: {
        containsi: search
      }},
      {mainName: {
        containsi: search
      }},
      {mainCode: {
        containsi: search
      }},
      {department: {
        title: { containsi: search }
      }}
    ]}
  )
  
  const json = await fetchData<{ data: { eduEducationalPrograms: EducationalProgramsT }; }>({ 
    query, 
    error: "Failed to fetch Edu Educational Programs", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        type: {
          containsi: type
        },
        department: departments ? {
          id: { in: departments }
        } : undefined,
        and: [
          {...connectedFilter},
          {or: searchFilter}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.eduEducationalPrograms.meta.pagination.total === 0 ||
    json.data.eduEducationalPrograms.data.length === 0
  ) {
    notFound();
  }

  const eduEducationalPrograms = EducationalProgramsT.parse(json.data.eduEducationalPrograms);

  return eduEducationalPrograms;
};
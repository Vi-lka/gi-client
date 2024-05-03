"use server"

import { notFound } from "next/navigation";
import { educationalPrograms } from "../contentQueries";
import { GraduatesT } from "../types/entities";
import fetchData from "./fetchData";

//.........................Graduates.........................//
export const getGraduates = async ({
  locale,
  page,
  pageSize,
  search,
  filterBy,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  search?: string;
  filterBy?: string;
}): Promise<GraduatesT> => {
  const query = /* GraphGL */ `
  query Graduates($locale: I18NLocaleCode, $pagination: PaginationArg, $filters: GraduateFiltersInput) {
    graduates(locale: $locale, pagination: $pagination, filters: $filters) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
          title
          description
          additionalInfo
          image {
            data {
              attributes {
                url
              }
            }
          }
          ${educationalPrograms}
          oldPrograms {
            title
            code
            mainName
            mainCode
            type
          }
        }
      }
    }
  }
  `;

  const connectedFilter = (filterBy && filterBy.length > 0) 
    ? {
      or: [
        {educational_programs: {
          slug: { eqi: filterBy }
        }},
        {dpoCourses: {
          slug: { eqi: filterBy }
        }},
        {educational_programs: {
          department: {
            slug: { eqi: filterBy }
          }
        }},
      ]
    } : undefined
  
  const json = await fetchData<{ data: { graduates: GraduatesT }; }>({
    query, 
    error: "Failed to fetch Graduates", 
    variables: {
      locale,
      pagination: { page, pageSize },
      filters: {
        and: [
          {...connectedFilter},
          {or: [
            {title: {
              containsi: search
            }},
            {description: {
              containsi: search
            }},
            {additionalInfo: {
              containsi: search
            }}
          ]}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.graduates.meta.pagination.total === 0 ||
    json.data.graduates.data.length === 0
  ) {
    notFound();
  }

  const graduates = GraduatesT.parse(json.data.graduates);

  return graduates;
};
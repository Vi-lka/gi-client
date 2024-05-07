"use server"

import { notFound } from "next/navigation";
import { EmployeesT } from "../types/entities";
import fetchData from "./fetchData";
import { genSearchFilter } from "../utils";

//.........................Employees.........................//
export const getEmployees = async ({
  locale,
  page,
  pageSize,
  sort = "order:asc",
  search,
  filterBy,
  departments,
  hashtags
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  filterBy?: string;
  departments?: string[]
  hashtags?: string[]
}): Promise<EmployeesT> => {
  const query = /* GraphGL */ `
    query Employees($locale: I18NLocaleCode, $filters: EmployeeFiltersInput, $sort: [String], $pagination: PaginationArg) {
      employees(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
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
            meta {
              posts {
                post
                department {
                  data {
                    attributes {
                      shortTitle slug
                    }
                  }
                }
              }
              degree degreeShort
              rank rankShort
            }
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
            email
            phone
            location
            hashtags {
              data {
                id
                attributes {
                  slug
                  title
                }
              }
            }
            head_in_department {
              data {
                id
                attributes {
                  shortTitle
                  slug
                }
              }
            }
            departments {
              data {
                id
                attributes {
                  shortTitle
                  slug
                }
              }
            }
            showContacts
            showHashtags
          }
        }
      }
    }
  `;

  const connectedFilter = (filterBy && filterBy.length > 0) 
    ? {
      or: [
        {educationalPrograms: {
          slug: { eqi: filterBy }
        }},
        {dpoCourses: {
          slug: { eqi: filterBy }
        }},
        {head_in_department: {
          slug: { eqi: filterBy }
        }},
        {departments: {
          slug: { eqi: filterBy }
        }}
      ]
    } : undefined;
  
  const searchFilter = genSearchFilter(
    "containsi",
    search,
    {or: [
      {title: { containsi: search }},
      {description: { containsi: search }},
      {meta: {
        degree: { containsi: search }
      }},
      {meta: {
        degreeShort: { containsi: search }
      }},
      {meta: {
        rank: { containsi: search }
      }},
      {meta: {
        rankShort: { containsi: search }
      }},
      {meta: {
        posts: {
          post: { containsi: search }
        }
      }},
      {meta: {
        posts: {
          department: {
            title: { containsi: search }
          }
        }
      }},
      {meta: {
        posts: {
          department: {
            shortTitle: { containsi: search }
          }
        }
      }},
      // BUG: Too slow response issue
      // {head_in_department: {
      //   title: { containsi: search }
      // }},
      // {head_in_department: {
      //   shortTitle: { containsi: search }
      // }},
      {hashtags: {
        title: { containsi: search }
      }}
    ]}
  )

  const json = await fetchData<{ data: { employees: EmployeesT }; }>({ 
    query, 
    error: "Failed to fetch Employees", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        departments: departments ? {
          id: { in: departments }
        } : undefined,
        hashtags: hashtags ? {
          id: { in: hashtags }
        } : undefined,
        and: [
          {...connectedFilter},
          {or: searchFilter}
        ]
      }
    }
  })
  
  if (
    json.data.employees.meta.pagination.total === 0 ||
    json.data.employees.data.length === 0
  ) {
    notFound();
  }

  const employees = EmployeesT.parse(json.data.employees);

  return employees;
};

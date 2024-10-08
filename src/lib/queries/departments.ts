"use server"

import { notFound } from "next/navigation";
import fetchData from "./fetchData";
import type { StructureCategoryEnum } from "../types/entities";
import { DepartmentsT } from "../types/entities";
import { genSearchFilter } from "../utils";

//.........................Departments.........................//
export const getDepartments = async ({
  locale,
  page,
  pageSize,
  sort = "order:asc",
  search,
  category,
  typeId,
  filterBy,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  category?: StructureCategoryEnum | null,
  typeId?: string;
  filterBy?: string;
}): Promise<DepartmentsT> => {
  const query = /* GraphGL */ `
    query Departments($locale: I18NLocaleCode, $filters: DepartmentFiltersInput, $sort: [String], $pagination: PaginationArg) {
      departments(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
        meta {
          pagination {
            total
          }
        }
        data {
          id
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
            contacts {
              url
              email
              phone
              location
            }
            head {
              data {
                id
                attributes { 
                  slug
                  title 
                }
              }
            }
          }
        }
      }
    }
  `;

  const typeFilter = 
  typeId 
    ? {
      id: {
        eqi: typeId
      }
    } 
    : 
    category 
      ? {
        category: {
          eqi: category
        }
      }
      : null
  

  const connectedFilter = (filterBy && filterBy.length > 0) 
    ? {
      or: [
        {educationalPrograms: {
          slug: { eqi: filterBy }
        }},
        {dpoCourses: {
          slug: { eqi: filterBy }
        }},
        {head: {
          slug: { eqi: filterBy }
        }},
        {employees: {
          slug: { eqi: filterBy }
        }},
        {events: {
          slug: { eqi: filterBy }
        }},
        {eduEducationalPrograms: {
          slug: { eqi: filterBy }
        }},
        {projects: {
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
      {shortTitle: {
        containsi: search
      }},
      {description: {
        containsi: search
      }},
      {type: {
        title: { containsi: search }
      }},
      {contacts: {
        url: { containsi: search }
      }},
      {contacts: {
        phone: { containsi: search }
      }},
      {contacts: {
        email: { containsi: search }
      }},
      {contacts: {
        location: { containsi: search }
      }}
    ]}
  )

  const json = await fetchData<{ data: { departments: DepartmentsT }; }>({ 
    query, 
    error: "Failed to fetch Departments", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        type: typeFilter,
        and: [
          {...connectedFilter},
          {or: searchFilter}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.departments.meta.pagination.total === 0 ||
    json.data.departments.data.length === 0
  ) {
    notFound();
  }

  const departments = DepartmentsT.parse(json.data.departments);

  return departments;
};
"use server"

import { notFound } from "next/navigation";
import { ProjectsT } from "../types/entities";
import fetchData from "./fetchData";
import { genSearchFilter } from "../utils";

//.........................Projects.........................//
export const getProjects = async ({
  locale,
  page,
  pageSize,
  sort = "order:asc",
  search,
  filterBy,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  filterBy?: string;
}): Promise<ProjectsT> => {
  const query = /* GraphGL */ `
    query Projects($locale: I18NLocaleCode, $filters: ProjectFiltersInput, $sort: [String], $pagination: PaginationArg) {
      projects(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
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
            description
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
          }
        }
      }
    }
  `;

  const connectedFilter = (filterBy && filterBy.length > 0) 
  ? {
    or: [
      {departments: {
        slug: { eqi: filterBy }
      }},
      {employees: {
        slug: { eqi: filterBy }
      }},
      {events: {
        slug: { eqi: filterBy }
      }},
      {news: {
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
      {description: {
        containsi: search
      }}
    ]}
  )
  
  const json = await fetchData<{ data: { projects: ProjectsT }; }>({ 
    query, 
    error: "Failed to fetch Projects", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        and: [
          {...connectedFilter},
          {or: searchFilter}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.projects.meta.pagination.total === 0 ||
    json.data.projects.data.length === 0
  ) {
    notFound();
  }

  const projects = ProjectsT.parse(json.data.projects);

  return projects;
};
"use server"

import { notFound } from "next/navigation";
import { JournalsT } from "../types/entities";
import fetchData from "./fetchData";
import { genSearchFilter } from "../utils";

//.........................Journals.........................//
export const getJournals = async ({
  locale,
  page,
  pageSize,
  sort = "order:asc",
  search,
//   filterBy,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
//   filterBy?: string;
}): Promise<JournalsT> => {
  const query = /* GraphGL */ `
    query Journals($locale: I18NLocaleCode, $filters: JournalFiltersInput, $sort: [String], $pagination: PaginationArg) {
      journals(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
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

//   const connectedFilter = (filterBy && filterBy.length > 0) 
//   ? {
//     or: [
//       {departments: {
//         slug: { eqi: filterBy }
//       }},
//       {employees: {
//         slug: { eqi: filterBy }
//       }},
//       {events: {
//         slug: { eqi: filterBy }
//       }},
//       {news: {
//         slug: { eqi: filterBy }
//       }}
//     ]
//   } : undefined;

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
  
  const json = await fetchData<{ data: { journals: JournalsT }; }>({ 
    query, 
    error: "Failed to fetch Journals", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        and: [
        //   {...connectedFilter},
          {or: searchFilter}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log(json.data)
  
  if (
    json.data.journals.meta.pagination.total === 0 ||
    json.data.journals.data.length === 0
  ) {
    notFound();
  }
  const journals = JournalsT.parse(json.data.journals);

  return journals;
};
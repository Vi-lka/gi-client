"use server"

import { notFound } from "next/navigation";
import { EventsT } from "../types/entities";
import fetchData from "./fetchData";
import { genSearchFilter } from "../utils";

//.........................News.........................//
export const getEvents = async ({
  locale,
  page,
  pageSize = 100000,
  sort = "dateStart:asc",
  search,
  filterBy
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  filterBy?: string;
}): Promise<EventsT> => {
  const query = /* GraphGL */ `
    query Events($locale: I18NLocaleCode, $filters: EventFiltersInput, $sort: [String], $pagination: PaginationArg) {
      events(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
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
            location
            online
            text
            dateStart
            dateEnd
            days(sort: "date:asc") {
              title
              date
              points(sort: "time:asc") {
                time
                description
                text
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
      {educationalPrograms: {
        slug: { eqi: filterBy }
      }},
      {dpoCourses: {
        slug: { eqi: filterBy }
      }},
      {departments: {
        slug: { eqi: filterBy }
      }},
      {employees: {
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
      {text: {
        containsi: search
      }},
      {location: {
        containsi: search
      }},
      {days: {
        points: {
          description: { containsi: search }
        }
      }},
      {days: {
        points: {
          text: { containsi: search }
        }
      }},
      {departments: {
        title: { containsi: search }
      }},
      {educationalPrograms: {
        title: { containsi: search }
      }},
      {dpoCourses: {
        title: { containsi: search }
      }}
    ]}
  )
  
  const json = await fetchData<{ data: { events: EventsT }; }>({ 
    query, 
    error: "Failed to fetch Events", 
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
    json.data.events.meta.pagination.total === 0 ||
    json.data.events.data.length === 0
  ) {
    notFound();
  }

  const events = EventsT.parse(json.data.events);

  return events;
};
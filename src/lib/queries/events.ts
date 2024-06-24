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
  sort = "publishedAt:desc",
  search
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
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
            text
            dateStart
            dateEnd
            points {
                time
                description
                text
            }
          }
        }
      }
    }
  `;

  const searchFilter = genSearchFilter(
    "containsi",
    search,
    {or: [
      {title: {
        containsi: search
      }},
      {text: {
        containsi: search
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
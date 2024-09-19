"use server"

import { notFound } from "next/navigation";
import { NewsT } from "../types/entities";
import fetchData from "./fetchData";
import { genSearchFilter } from "../utils";

//.........................News.........................//
export const getNews = async ({
  locale,
  page,
  pageSize,
  sort = "publishedAt:desc",
  search,
  filterBy
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  filterBy?: string;
}): Promise<NewsT> => {
  const query = /* GraphGL */ `
    query News($locale: I18NLocaleCode, $filters: NewFiltersInput, $sort: [String], $pagination: PaginationArg) {
      news(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
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
            publishedAt
          }
        }
      }
    }
  `;

  const connectedFilter = (filterBy && filterBy.length > 0) 
  ? {
    or: [
      {events: {
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
      {text: {
        containsi: search
      }}
    ]}
  )
  
  const json = await fetchData<{ data: { news: NewsT }; }>({ 
    query, 
    error: "Failed to fetch News", 
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
    json.data.news.meta.pagination.total === 0 ||
    json.data.news.data.length === 0
  ) {
    notFound();
  }

  const news = NewsT.parse(json.data.news);

  return news;
};
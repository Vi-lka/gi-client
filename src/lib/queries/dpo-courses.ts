import { notFound } from "next/navigation";
import { DpoCoursesT } from "../types/entities";
import fetchData from "./fetchData";

//.........................Dpo Courses.........................//
export const getDpoCourses = async ({
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
}): Promise<DpoCoursesT> => {
  const query = /* GraphGL */ `
    query DpoCourses($locale: I18NLocaleCode, $filters: DpoCourseFiltersInput, $sort: [String], $pagination: PaginationArg) {
      dpoCourses(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
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
            dateStart
            dateEnd
            location
            hours
            price
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
      }}
    ]
  } : undefined
  
  const json = await fetchData<{ data: { dpoCourses: DpoCoursesT }; }>({ 
    query, 
    error: "Failed to fetch Dpo Courses", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        and: [
          {...connectedFilter},
          {or: [
            {title: {
              containsi: search
            }}
          ]}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.dpoCourses.meta.pagination.total === 0 ||
    json.data.dpoCourses.data.length === 0
  ) {
    notFound();
  }

  const dpoCourses = DpoCoursesT.parse(json.data.dpoCourses);

  return dpoCourses;
};
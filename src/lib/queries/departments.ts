import { notFound } from "next/navigation";
import fetchData from "./fetchData";
import { StructuresT } from "../types/entities";

//.........................Departments.........................//
export const getDepartments = async ({
  locale,
  page,
  pageSize,
  sort = "order:asc",
  search,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
}): Promise<StructuresT> => {
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
          }
        }
      }
    }
  `;
  
  const json = await fetchData<{ data: { departments: StructuresT }; }>({ 
    query, 
    error: "Failed to fetch Departments", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        or: [{
          title: {
            containsi: search
          }
        }]
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

  const departments = StructuresT.parse(json.data.departments);

  return departments;
};
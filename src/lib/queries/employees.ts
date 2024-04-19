import { notFound } from "next/navigation";
import { EmployeesT } from "../types/entities";
import fetchData from "./fetchData";

//.........................Employees.........................//
export const getEmployees = async ({
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
            title
            meta {
              post
              degree
              degreeShort
              rank
              rankShort
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
                attributes {
                  slug
                  title
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
  
  const json = await fetchData<{ data: { employees: EmployeesT }; }>({ 
    query, 
    error: "Failed to fetch Employees", 
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
    json.data.employees.meta.pagination.total === 0 ||
    json.data.employees.data.length === 0
  ) {
    notFound();
  }

  const employees = EmployeesT.parse(json.data.employees);

  return employees;
};
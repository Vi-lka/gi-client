"use server"

import { notFound } from "next/navigation";
import fetchData from "./fetchData";
import type { GroupCourseEnum } from "../types/entities";
import { GroupsT, GroupSingleT } from "../types/entities";
import { genSearchFilter } from "../utils";

//.........................Groups.........................//
export const getGroups = async ({
  locale,
  page,
  pageSize,
  sort = "order:asc",
  search,
  course,
  filterBy,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  course?: GroupCourseEnum;
  filterBy?: string;
}): Promise<GroupsT> => {
  const query = /* GraphGL */ `
    query Groups($locale: I18NLocaleCode, $filters: GroupFiltersInput, $sort: [String], $pagination: PaginationArg) {
      groups(locale: $locale, filters: $filters, sort: $sort, pagination: $pagination) {
        meta {
          pagination {
            total
          }
        }
        data {
          id
          attributes {
            title
            course
            tests {
              date
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            exams {
              date 
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            stateExams {
              date
              name
              address
              chairman
              description
            }
            diplomas {
              date
              name
              address
              chairman
              description
            }
            rescheduling {
              date
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            retakes {
              date
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            eduPractices { 
              dateStart 
              dateEnd 
              description
            }
            internships { 
              dateStart 
              dateEnd 
              description
            }
            preGraduatePractices { 
              dateStart 
              dateEnd 
              description 
            }
            holidays { 
              dateStart 
              dateEnd 
              description 
            }
          }
        }
      }
    }
  `;

  const courseFilter = 
  course
    ? {
      eqi: course
    } 
    : undefined
  

  const connectedFilter = (filterBy && filterBy.length > 0) 
    ? {
      or: [
        {eduEducationalProgram: {
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
      }}
    ]}
  )

  const json = await fetchData<{ data: { groups: GroupsT }; }>({ 
    query, 
    error: "Failed to fetch Departments", 
    variables: {
      locale,
      sort,
      pagination: { page, pageSize },
      filters: {
        course: courseFilter,
        and: [
          {...connectedFilter},
          {or: searchFilter}
        ]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.groups.meta.pagination.total === 0 ||
    json.data.groups.data.length === 0
  ) {
    notFound();
  }

  const groups = GroupsT.parse(json.data.groups);

  return groups;
};





export const getGroupById = async (locale: string, id: string): Promise<GroupSingleT> => {
  const query = /* GraphGL */ `
    query GetGroupById($groupId: ID, $locale: I18NLocaleCode) {
      group(id: $groupId, locale: $locale) {
        data {
          id
          attributes {
            title
            course
            tests {
              date
              time
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            exams {
              date
              time
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            stateExams {
              date
              time
              name
              address
              chairman
              description
            }
            diplomas {
              date
              time
              name
              address
              chairman
              description
            }
            rescheduling {
              date
              time
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            retakes {
              date
              time
              name
              address
              teacher {
                data {
                  id
                  attributes { slug title }
                }
              }
              description
            }
            eduPractices { 
              dateStart 
              dateEnd 
              description
            }
            internships { 
              dateStart 
              dateEnd 
              description
            }
            preGraduatePractices { 
              dateStart 
              dateEnd 
              description 
            }
            holidays { 
              dateStart 
              dateEnd 
              description 
            }
          }
        }
      }
    }
  `;

  const json = await fetchData<{ 
    data: { 
      group: {
        data: GroupSingleT
      }; 
    }; 
  }>({ 
    query, 
    error: `Failed to fetch Group: ${id}`, 
    variables: {
      locale,
      groupId: id
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (json.data.group.data === null) notFound();

  const group = GroupSingleT.parse(json.data.group.data);

  return group;
};
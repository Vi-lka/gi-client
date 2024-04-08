import { notFound } from "next/navigation";
import type { EducationalProgramTypeEnum} from "./types";
import { EducationalProgramsT, DpoCoursesT, GraduatesT } from "./types";

export async function fetchData<T>({
  query,
  error,
  variables,
}: {
  query: string,
  error: string,
  variables?: unknown
}): Promise<T> {
  const headers = {
    "Content-Type": "application/json"
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
      variables
    }),
    next: {
      tags: ["strapi"],
      // Next.js issue: if fetch in the component, not on the page, the cache is always MISS with tags, but with Time-based Revalidation both works correctly
      revalidate: 60,
    },
  });
    
  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error(error);
  }

  const json = await res.json() as T

  return json
}

//.........................Educational Programs.........................//
export const getEducationalPrograms = async ({
  page,
  pageSize,
  type = "",
  sort = "order:asc",
  search,
}: {
  page?: number;
  pageSize?: number;
  type?: EducationalProgramTypeEnum | ""
  sort?: string;
  search?: string;
}): Promise<EducationalProgramsT> => {
  const query = /* GraphGL */ `
    query EducationalPrograms($sort: [String], $pagination: PaginationArg, $filters: EducationalProgramFiltersInput) {
      educationalPrograms(sort: $sort, pagination: $pagination, filters: $filters) {
        meta {
          pagination {
            total
          }
        }
        data {
          id
          attributes {
            slug
            title
            type
            code
            mainName
            mainCode
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
  
  const json = await fetchData<{ data: { educationalPrograms: EducationalProgramsT }; }>({ 
    query, 
    error: "Failed to fetch Educational Programs", 
    variables: {
      sort,
      pagination: { page, pageSize },
      filters: {
        type: {
          containsi: type
        },
        or: [{
          title: {
            containsi: search
          },
          code: {
            containsi: search
          },
          mainName: {
            containsi: search
          },
          mainCode: {
            containsi: search
          }
        }]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.educationalPrograms.meta.pagination.total === 0 ||
    json.data.educationalPrograms.data.length === 0
  ) {
    notFound();
  }

  const educationalPrograms = EducationalProgramsT.parse(json.data.educationalPrograms);

  return educationalPrograms;
};

//.........................Dpo Courses.........................//
export const getDpoCourses = async ({
  page,
  pageSize,
  sort = "order:asc",
  search,
}: {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
}): Promise<DpoCoursesT> => {
  const query = /* GraphGL */ `
    query DpoCourses($filters: DpoCourseFiltersInput, $sort: [String], $pagination: PaginationArg) {
      dpoCourses(filters: $filters, sort: $sort, pagination: $pagination) {
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
  
  const json = await fetchData<{ data: { dpoCourses: DpoCoursesT }; }>({ 
    query, 
    error: "Failed to fetch Dpo Courses", 
    variables: {
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
    json.data.dpoCourses.meta.pagination.total === 0 ||
    json.data.dpoCourses.data.length === 0
  ) {
    notFound();
  }

  const dpoCourses = DpoCoursesT.parse(json.data.dpoCourses);

  return dpoCourses;
};


//.........................Graduates.........................//
export const getGraduates= async ({
  page,
  pageSize,
  type,
  search,
}: {
  page?: number;
  pageSize?: number;
  type?: EducationalProgramTypeEnum | ""
  search?: string;
}): Promise<GraduatesT> => {
  const query = /* GraphGL */ `
  query Graduates($pagination: PaginationArg, $filters: GraduateFiltersInput) {
    graduates(pagination: $pagination, filters: $filters) {
      meta {
        pagination {
          total
        }
      }
      data {
        id
        attributes {
          title
          description
          additionalInfo
          image {
            data {
              attributes {
                url
              }
            }
          }
          educational_programs {
            data {
              id
              attributes {
                slug
                title
                code
                mainName
                mainCode
                type
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
          oldPrograms {
            title
            code
            mainName
            mainCode
            type
          }
        }
      }
    }
  }
  `;
  
  const json = await fetchData<{ data: { graduates: GraduatesT }; }>({
    query, 
    error: "Failed to fetch Graduates", 
    variables: {
      pagination: { page, pageSize },
      filters: {
        or: [{
          title: {
            containsi: search
          },
          description: {
            containsi: search
          },
          additionalInfo: {
            containsi: search
          },
          educational_programs: {
            type: {
              containsi: type
            },
            or: [{
              title: {
                containsi: search
              },
              code: {
                containsi: search
              },
              mainName: {
                containsi: search
              },
              mainCode: {
                containsi: search
              }
            }]
          },
          oldPrograms: {
            type: {
              containsi: type
            },
            or: [{
              title: {
                containsi: search
              },
              code: {
                containsi: search
              },
              mainName: {
                containsi: search
              },
              mainCode: {
                containsi: search
              }
            }]
          }
        }]
      }
    }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  
  if (
    json.data.graduates.meta.pagination.total === 0 ||
    json.data.graduates.data.length === 0
  ) {
    notFound();
  }

  const graduates = GraduatesT.parse(json.data.graduates);

  return graduates;
};

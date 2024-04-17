import { notFound } from "next/navigation";
import type { EducationalProgramTypeEnum } from "./types";
import { LinksT, NavBarT} from "./types";
import { EducationalProgramsT, DpoCoursesT, GraduatesT } from "./types";
import { dynamicContentLinksQuery } from "./dynamicContentQuery";
import { educationalPrograms } from "./contentQueries";

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
  locale,
  page,
  pageSize,
  type = "",
  sort = "order:asc",
  search,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  type?: EducationalProgramTypeEnum | ""
  sort?: string;
  search?: string;
}): Promise<EducationalProgramsT> => {
  const query = /* GraphGL */ `
    query EducationalPrograms($locale: I18NLocaleCode, $sort: [String], $pagination: PaginationArg, $filters: EducationalProgramFiltersInput) {
      educationalPrograms(locale: $locale, sort: $sort, pagination: $pagination, filters: $filters) {
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
      locale,
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
  locale,
  page,
  pageSize,
  type,
  search,
}: {
  locale: string,
  page?: number;
  pageSize?: number;
  type?: EducationalProgramTypeEnum | ""
  search?: string;
}): Promise<GraduatesT> => {
  const query = /* GraphGL */ `
  query Graduates($locale: I18NLocaleCode, $pagination: PaginationArg, $filters: GraduateFiltersInput) {
    graduates(locale: $locale, pagination: $pagination, filters: $filters) {
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
          ${educationalPrograms}
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
      locale,
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

export const getNavBar = async (locale: string): Promise<NavBarT | null> => {
  const sameFields = `
    subLinks {
      title
      link
    }
  `
  const query = /* GraphGL */ `
  query NavBar($locale: I18NLocaleCode) {
    navBar(locale: $locale) {
      data {
        attributes {
          info { ${sameFields} }
          structure { ${sameFields} }
          education { ${sameFields} }
          admission { ${sameFields} }
          dpo { ${sameFields} }
          science { ${sameFields} }
          projects { ${sameFields} }
          journals { ${sameFields} }
        }
      }
    }
  }
  `;

  const json = await fetchData<{ 
    data: { 
      navBar: { 
            data: {
                attributes: NavBarT 
            } | null
        } 
    };
  }>({ 
      query, 
      error: "Failed to fetch NavBar",
      variables: {
        locale
      }
  })

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  if (json.data.navBar.data === null) return null;

  const navBar = NavBarT.parse(json.data.navBar.data.attributes);

  return navBar;
};

export const getLinks = async (locale: string): Promise<LinksT> => {
  const sameFields = `
    (locale: $locale) {
      data {
        attributes {
          title
          navBarConfig {
            navBarTitle
            navBarDescription
            navBarImage {
              data { attributes {url} }
            }
          }
          content {
            ${dynamicContentLinksQuery}
          }
        }
      }
    }
  `
  const query = /* GraphGL */ `
    query Links($locale: I18NLocaleCode) {
      entrancePage${sameFields}
      dpo${sameFields}
    }
  `;

  const json = await fetchData<{ 
      data: LinksT; 
  }>({ 
      query, 
      error: "Failed to fetch Links",
      variables: {
        locale
      }
  })

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  if (json.data === null) notFound();

  const links = LinksT.parse(json.data);

  return links;
};

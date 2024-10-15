"use server"

import fetchData from "./fetchData";
import { SearchAllResultT } from "../types/search-all";
import { dynamicContentQuery } from "../dynamicContentQuery";
import { findAllRecursive, paginate } from "../utils";
import { notFound } from "next/navigation";

//.........................Search All.........................//
export const getSearchAll = async ({
  locale,
  page,
  pageSize,
  search_all
}: {
  locale: string,
  page: number;
  pageSize: number;
  search_all?: string;
}) => {
  const query = /* GraphGL */ `
    query SearchAll($locale: I18NLocaleCode) {
      mainPage(locale: $locale) {
        data {
          __typename
          attributes {
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      entrancePage(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      dpo(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      structure(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      employeesPage(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      info(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      newsPage(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      eventsPage(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      educationPage(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      projectsPage(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
      journalsPage(locale: $locale) {
        data {
          __typename
          attributes {
            title
            navBarConfig { navBarTitle }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      additionalPages(locale: $locale) {
        meta {
          pagination {
            total
          }
        }
        data {
          __typename
          id
          attributes {
            slug
            title
            navBarConfig { navBarTitle }
            additional_pages {
              data {
                attributes {
                  slug
                  title
                  navBarConfig { navBarTitle }
                }
              }
            }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      educationalPrograms(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
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
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      eduEducationalPrograms(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
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
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      dpoCourses(locale: $locale) {
        data {
          __typename
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
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      employees(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
            meta {
              posts {
                post
                department {
                  data {
                    attributes {
                      slug
                      title
                      shortTitle
                    }
                  }
                }
              }
              degree degreeShort
              rank rankShort
            }
            email
            phone
            location
            hashtags {
              data {
                id
                attributes {
                  slug
                  title
                }
              }
            }
            head_in_department {
              data {
                attributes {
                  slug
                  title
                  shortTitle
                }
              }
            }
            departments {
              data {
                attributes {
                  slug
                  title
                  shortTitle
                }
              }
            }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      departments(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
            image {
              data {
                attributes {
                  url
                }
              }
            }
            description_title
            description
            contacts {
              url
              email
              phone
              location
            }
            head {
              data {
                id
                attributes { 
                  slug
                  title 
                }
              }
            }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      news(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
            image {
              data {
                attributes {
                  url
                }
              }
            }
            text
            publishedAt
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      events(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
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
              id
              title
              date
              points(sort: "time:asc") {
                time
                description
                text
              }
            }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      projects(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
            description
            text
            year
            image {
              data {
                attributes {
                  url
                }
              }
            }
            head {
              title
              link
              description
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            members {
              ...on ComponentProjectsProjectMember {
                __typename
                description
                member {
                  data {
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
                  	} 
                  }
                }
              }
              ...on ComponentProjectsProjectMemberOutSide {
                __typename
                title
                description
                link
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }

      journals(locale: $locale) {
        data {
          __typename
          attributes {
            slug
            title
            description
            image {
              data {
                attributes {
                  url
                }
              }
            }
            content {
              ${dynamicContentQuery}
            }
          }
        }
      }
    }
  `;

//   const searchFilter = genSearchFilter(
//     "containsi",
//     search_all,
//     {or: [
//       {title: {
//         containsi: search_all
//       }},
//       {shortTitle: {
//         containsi: search_all
//       }},
//       {description: {
//         containsi: search_all
//       }},
//       {type: {
//         title: { containsi: search_all }
//       }},
//       {contacts: {
//         url: { containsi: search_all }
//       }},
//       {contacts: {
//         phone: { containsi: search_all }
//       }},
//       {contacts: {
//         email: { containsi: search_all }
//       }},
//       {contacts: {
//         location: { containsi: search_all }
//       }}
//     ]}
//   )

  const json = await fetchData<{ data: SearchAllResultT; }>({ 
    query, 
    error: "Failed to fetch Search All", 
    variables: { locale }
  })
  
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  const result = SearchAllResultT.parse(json.data);

  result.mainPage.data.attributes.slug = "/"
  result.entrancePage.data.attributes.slug = "/admission"
  result.dpo.data.attributes.slug = "/dpo"
  result.structure.data.attributes.slug = "/structure"
  result.employeesPage.data.attributes.slug = "/structure/employees"
  result.info.data.attributes.slug = "/info"
  result.newsPage.data.attributes.slug = "/info/news"
  result.eventsPage.data.attributes.slug = "/info/events"
  result.educationPage.data.attributes.slug = "/education"
  result.projectsPage.data.attributes.slug = "/projects"
  result.journalsPage.data.attributes.slug = "/journals"

  if (!search_all) return { data: [], total: 0 }
  else {
    const allData = [
      result.mainPage.data,
      result.entrancePage.data,
      result.dpo.data,
      result.structure.data,
      result.employeesPage.data,
      result.info.data,
      result.newsPage.data,
      result.eventsPage.data,
      result.educationPage.data,
      result.projectsPage.data,
      result.journalsPage.data,
      ...result.additionalPages.data,
      ...result.educationalPrograms.data,
      ...result.eduEducationalPrograms.data,
      ...result.dpoCourses.data,
      ...result.employees.data,
      ...result.departments.data,
      ...result.news.data,
      ...result.events.data,
      ...result.projects.data,
      ...result.journals.data
    ]
    const finded = findAllRecursive(allData, search_all)

    if (finded.length === 0) notFound()

    const paginated = paginate(finded, pageSize, page)

    return { data: paginated, total: finded.length }
  }
};
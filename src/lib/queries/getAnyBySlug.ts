import fetchData from "./fetchData";

type Item = {
  data: {
    attributes: {
      slug: string,
      title: string,
    }
  }[]
}

type Data = {
  additionalPages: {
    data: {
      attributes: {
        slug: string,
        title: string,
        additional_pages: {
          data: {
            attributes: {
              slug: string,
              title: string
            }
          }[]
        }
      }
    }[]
  },
  educationalPrograms: Item,
  eduEducationalPrograms: Item,
  dpoCourses: Item,
  employees: Item,
  departments: Item,
  news: Item,
  events: Item,
  projects: Item,
  journals: Item,
}

//.........................GetAnyBySlug.........................//
export const getAnyBySlug = async ({
  locale,
  pathName
}: {
  locale: string,
  pathName: string,
}) => {

  const pathNameArr = pathName.split("/")

  const slug = pathNameArr[pathNameArr.length - 1]

  const query = /* GraphGL */ `
    query getAnyBySlug($locale: I18NLocaleCode) {
      additionalPages(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
            additional_pages {
              data {
                attributes {
                  slug
                  title
                }
              }
            }
          }
        }
      }

      educationalPrograms(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }

      eduEducationalPrograms(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }

      dpoCourses(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            title
            slug
          }
        }
      }

      employees(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }

      departments(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }

      news(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"            
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }

      events(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }

      projects(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }

      journals(
        locale: $locale, 
        filters: {
          slug: {
            eqi: "${slug}"
          }
        }
      ) {
        data {
          attributes {
            slug
            title
          }
        }
      }
    }
  `;

  const json = await fetchData<{ data: Data; }>({ 
    query, 
    error: "Failed to fetch getAnyBySlug", 
    variables: { locale }
  })


  const titles: string[] = []

  pathNameArr.forEach(item => {
    if (item === "") titles.push("Главная");
    if (item === "admission") titles.push("Поступление");
    if (item === "dpo") titles.push("ДПО");
    if (item === "structure") titles.push("Структура");
    if (item === "employees") titles.push("Сотрудники");
    if (item === "info") titles.push("Сведения");
    if (item === "news") titles.push("Новости");
    if (item === "events") titles.push("Мероприятия");
    if (item === "education") titles.push("Обучение");
    if (item === "programs") titles.push("Программы");
    if (item === "projects") titles.push("Проекты");
    if (item === "journals") titles.push("Журналы");
  })

  if (json.data.additionalPages.data.length > 0) {
    json.data.additionalPages.data[0].attributes.additional_pages.data.forEach(item => {
      titles.push(item.attributes.title)
    })
    titles.push(json.data.additionalPages.data[0].attributes.title)
  }
  if (json.data.departments.data.length > 0) titles.push(json.data.departments.data[0].attributes.title)
  if (json.data.dpoCourses.data.length > 0) titles.push(json.data.dpoCourses.data[0].attributes.title)
  if (json.data.eduEducationalPrograms.data.length > 0) titles.push(json.data.eduEducationalPrograms.data[0].attributes.title)
  if (json.data.educationalPrograms.data.length > 0) titles.push(json.data.educationalPrograms.data[0].attributes.title)
  if (json.data.employees.data.length > 0) titles.push(json.data.employees.data[0].attributes.title)
  if (json.data.events.data.length > 0) titles.push(json.data.events.data[0].attributes.title)
  if (json.data.journals.data.length > 0) titles.push(json.data.journals.data[0].attributes.title)
  if (json.data.news.data.length > 0) titles.push(json.data.news.data[0].attributes.title)
  if (json.data.projects.data.length > 0) titles.push(json.data.projects.data[0].attributes.title)

  const resultTitle = titles.join(" / ")

  return resultTitle

}
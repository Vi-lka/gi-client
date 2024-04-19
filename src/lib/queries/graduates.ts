import { notFound } from "next/navigation";
import { educationalPrograms } from "../contentQueries";
import type { EducationalProgramTypeEnum} from "../types/entities";
import { GraduatesT } from "../types/entities";
import fetchData from "./fetchData";

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
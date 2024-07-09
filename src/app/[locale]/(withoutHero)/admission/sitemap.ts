import fetchData from "@/lib/queries/fetchData";
import type { MetadataRoute } from "next"

type DataT = {
    data: { 
        educationalPrograms: {
            data: {
                attributes: {
                    slug: string,
                    updatedAt: string
                }
            }[]
        } 
    };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const query = /* GraphGL */ `
      query EducationalProgramsMap($pagination: PaginationArg) {
        educationalPrograms(pagination: $pagination) {
          data {
            attributes {
              slug
              updatedAt
            }
          }
        }
      }
    `;

    const json = await fetchData<DataT>({ 
        query, 
        error: "Failed to fetch Educational Programs Map", 
        variables: {
            // Google's limit is 50,000 URLs per sitemap
            pagination: { pageSize: 50000 },
        }
    })

    const educationalPrograms = json.data.educationalPrograms.data.map(item => item.attributes)

    return educationalPrograms.map((item) => ({
        url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/admission/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'monthly',
        alternates: {
            languages: {
                ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru" + `/admission/${item.slug}`,
                en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en" + `/admission/${item.slug}`,
            },
        },
        priority: 0.7,
    }))
}
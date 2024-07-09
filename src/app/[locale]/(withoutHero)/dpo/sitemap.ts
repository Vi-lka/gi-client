import fetchData from "@/lib/queries/fetchData";
import type { MetadataRoute } from "next"

type DataT = {
    data: { 
        dpoCourses: {
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
      query DpoCoursesMap($pagination: PaginationArg) {
        dpoCourses(pagination: $pagination) {
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
        error: "Failed to fetch Dpo Courses Map", 
        variables: {
            // Google's limit is 50,000 URLs per sitemap
            pagination: { pageSize: 50000 },
        }
    })

    const dpoCourses = json.data.dpoCourses.data.map(item => item.attributes)

    return dpoCourses.map((item) => ({
        url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/dpo/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'monthly',
        alternates: {
            languages: {
                ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru" + `/dpo/${item.slug}`,
                en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en" + `/dpo/${item.slug}`,
            },
        },
        priority: 0.7,
    }))
}
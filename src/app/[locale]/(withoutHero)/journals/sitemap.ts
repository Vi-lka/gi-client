import fetchData from "@/lib/queries/fetchData";
import type { MetadataRoute } from "next"

type DataT = {
    data: { 
        journals: {
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
      query Journals($pagination: PaginationArg) {
        journals(pagination: $pagination) {
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
        error: "Failed to fetch Journals Map", 
        variables: {
            // Google's limit is 50,000 URLs per sitemap
            pagination: { pageSize: 50000 },
        }
    })

    const journals = json.data.journals.data.map(item => item.attributes)

    return journals.map((item) => ({
        url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/journals/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'monthly',
        alternates: {
            languages: {
                ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru" + `/journals/${item.slug}`,
                en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en" + `/journals/${item.slug}`,
            },
        },
        priority: 0.7,
    }))
}
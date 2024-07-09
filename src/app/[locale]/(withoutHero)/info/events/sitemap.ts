import fetchData from "@/lib/queries/fetchData";
import type { MetadataRoute } from "next"

type DataT = {
    data: { 
        events: {
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
      query EventsMap($pagination: PaginationArg) {
        events(pagination: $pagination) {
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
        error: "Failed to fetch Events Map", 
        variables: {
            // Google's limit is 50,000 URLs per sitemap
            pagination: { pageSize: 50000 },
        }
    })

    const events = json.data.events.data.map(item => item.attributes)

    return events.map((item) => ({
        url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/info/events/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'daily',
        alternates: {
            languages: {
                ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru" + `/info/events/${item.slug}`,
                en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en" + `/info/events/${item.slug}`,
            },
        },
        priority: 0.6,
    }))
}
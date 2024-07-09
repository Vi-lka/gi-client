import fetchData from "@/lib/queries/fetchData";
import type { MetadataRoute } from "next"

type DataT = {
    data: { 
        employees: {
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
      query EmployeesMap($pagination: PaginationArg) {
        employees(pagination: $pagination) {
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
        error: "Failed to fetch Employees Map", 
        variables: {
            // Google's limit is 50,000 URLs per sitemap
            pagination: { pageSize: 50000 },
        }
    })

    const employees = json.data.employees.data.map(item => item.attributes)

    return employees.map((item) => ({
        url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/structure/employees/${item.slug}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: 'monthly',
        alternates: {
            languages: {
                ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru" + `/structure/employees/${item.slug}`,
                en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en" + `/structure/employees/${item.slug}`,
            },
        },
        priority: 0.6,
    }))
}
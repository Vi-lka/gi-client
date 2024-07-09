import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru",
      lastModified: new Date(),
      changeFrequency: 'daily',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en",
        },
      },
      priority: 1,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/info",
      lastModified: new Date(),
      changeFrequency: 'daily',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/info",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/info",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/structure",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/structure",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/structure",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/education",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/education",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/education",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/admission",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/admission",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/admission",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/dpo",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/dpo",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/dpo",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/science",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/science",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/science",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/projects",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/projects",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/projects",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/journals",
      lastModified: new Date(),
      changeFrequency: 'weekly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/journals",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/journals",
        },
      },
      priority: 0.9,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/info/events",
      lastModified: new Date(),
      changeFrequency: 'daily',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/info/events",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/info/events",
        },
      },
      priority: 0.8,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/info/news",
      lastModified: new Date(),
      changeFrequency: 'daily',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/info/news",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/info/news",
        },
      },
      priority: 0.8,
    },
    {
      url: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/structure/employees",
      lastModified: new Date(),
      changeFrequency: 'monthly',
      alternates: {
        languages: {
          ru: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/ru/structure/employees",
          en: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/en/structure/employees",
        },
      },
      priority: 0.8,
    },
  ]
}
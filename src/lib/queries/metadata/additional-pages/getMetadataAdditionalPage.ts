"use server"

import { ParentPagesMetaT, i18NLocales } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataAdditionalPage(locale: string, slug: string | undefined, connectedSlugs: string[]): Promise<{
    data: ParentPagesMetaT,
    i18: i18NLocales
}> {
    const query = /* GraphGL */ `
    query getMetadataAdditionalPage($locale: I18NLocaleCode, $filters: AdditionalPageFiltersInput) {
      i18NLocales {
        data {
          id
          attributes { code name }
        }
      }
      additionalPages(locale: $locale, filters: $filters) {
        data {
          attributes {
            title
            navBarConfig { 
              navBarDescription 
              navBarImage {
                data {
                  attributes { url }
                }
              }
            }
          }
        }
      }
    }
    `;

    const json = await fetchData<{ 
      data: { 
        i18NLocales: {
          data: i18NLocales
        },
        additionalPages: { 
          data: { attributes : ParentPagesMetaT }[]
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata Additional Page",
        variables: {
          locale,
          filters: {
            slug: {
              eqi: slug
            },
            additional_pages: {
                slug: connectedSlugs.length > 0 ? 
                {
                  in: connectedSlugs
                }
                : null
            }
          }
        },
        revalidate: false
    })
    const data = ParentPagesMetaT.parse(json.data.additionalPages.data[0].attributes);
    const i18 = i18NLocales.parse(json.data.i18NLocales.data);

    return {data, i18};
};
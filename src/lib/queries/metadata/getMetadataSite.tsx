"use server"

import { SiteDescriptionT, i18NLocales } from "@/lib/types/additional";
import fetchData from "../fetchData";

export default async function getMetadataSite(locale: string): Promise<{
    data: SiteDescriptionT,
    i18: i18NLocales
}> {
    const query = /* GraphGL */ `
    query getMetadataSite($locale: I18NLocaleCode) {
      i18NLocales {
        data {
          id
          attributes {
            code
            name
          }
        }
      }
      siteDescription(locale: $locale) {
        data {
          attributes {
            title
            abbreviation
            description
            keywords { word }
            category
            publisher
            image {
              data {
                attributes { url }
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
        siteDescription: { 
          data: { attributes : SiteDescriptionT }
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Site Description",
        variables: {
          locale
        },
        revalidate: false
    })
    const data = SiteDescriptionT.parse(json.data.siteDescription.data.attributes);
    const i18 = i18NLocales.parse(json.data.i18NLocales.data);

    return {data, i18};
};
"use server"

import { ParentPagesMetaT, i18NLocales } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataEvents(locale: string): Promise<{
    data: ParentPagesMetaT,
    i18: i18NLocales
}> {
    const query = /* GraphGL */ `
    query getMetadataEvents($locale: I18NLocaleCode) {
      i18NLocales {
        data {
          id
          attributes { code name }
        }
      }
      eventsPage(locale: $locale) {
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
        eventsPage: { 
          data: { attributes : ParentPagesMetaT }
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata Events",
        variables: {
          locale
        }
    })
    const data = ParentPagesMetaT.parse(json.data.eventsPage.data.attributes);
    const i18 = i18NLocales.parse(json.data.i18NLocales.data);

    return {data, i18};
};
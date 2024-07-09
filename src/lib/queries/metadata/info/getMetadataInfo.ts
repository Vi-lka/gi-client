"use server"

import { ParentPagesMetaT, i18NLocales } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataInfo(locale: string): Promise<{
    data: ParentPagesMetaT,
    i18: i18NLocales
}> {
    const query = /* GraphGL */ `
    query getMetadataInfo($locale: I18NLocaleCode) {
      i18NLocales {
        data {
          id
          attributes { code name }
        }
      }
      info(locale: $locale) {
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
        info: { 
          data: { attributes : ParentPagesMetaT }
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata Info",
        variables: {
          locale
        }
    })
    const data = ParentPagesMetaT.parse(json.data.info.data.attributes);
    const i18 = i18NLocales.parse(json.data.i18NLocales.data);

    return {data, i18};
};
"use server"

import { ParentPagesMetaT, i18NLocales } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataStructure(locale: string): Promise<{
    data: ParentPagesMetaT,
    i18: i18NLocales
}> {
    const query = /* GraphGL */ `
    query getMetadataStructure($locale: I18NLocaleCode) {
      i18NLocales {
        data {
          id
          attributes { code name }
        }
      }
      structure(locale: $locale) {
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
        structure: { 
          data: { attributes : ParentPagesMetaT }
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata Structure",
        variables: {
          locale
        }
    })
    const data = ParentPagesMetaT.parse(json.data.structure.data.attributes);
    const i18 = i18NLocales.parse(json.data.i18NLocales.data);

    return {data, i18};
};
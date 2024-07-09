"use server"

import { ChildPagesMetaT } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataEventsSingle(locale: string, slug: string): Promise<ChildPagesMetaT> {
    const query = /* GraphGL */ `
    query getMetadataEventsSingle($locale: I18NLocaleCode, $filters: EventFiltersInput) {
      events(locale: $locale, filters: $filters) {
        data {
          attributes {
            title
            slug
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
        events: { 
          data: { attributes : ChildPagesMetaT }[]
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata Event",
        variables: {
          locale,
          filters: {
            slug: {
              eqi: slug
            }
          }
        }
    })
    const data = ChildPagesMetaT.parse(json.data.events.data[0].attributes);

    return data;
};
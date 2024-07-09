"use server"

import { ChildPagesMetaT } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataDpoCourse(locale: string, slug: string): Promise<ChildPagesMetaT> {
    const query = /* GraphGL */ `
    query getMetadataDpoCourse($locale: I18NLocaleCode, $filters: DpoCourseFiltersInput) {
      dpoCourses(locale: $locale, filters: $filters) {
        data {
          attributes {
            title
            slug
            image {
              data {
                attributes { url }
              }
            }
            description
          }
        }
      }
    }
    `;

    const json = await fetchData<{ 
      data: { 
        dpoCourses: { 
          data: { attributes : ChildPagesMetaT }[]
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata Dpo Course",
        variables: {
          locale,
          filters: {
            slug: {
              eqi: slug
            }
          }
        }
    })
    const data = ChildPagesMetaT.parse(json.data.dpoCourses.data[0].attributes);

    return data;
};
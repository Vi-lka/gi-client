"use server"

import { ChildPagesMetaT } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataNewsSingle(locale: string, slug: string): Promise<ChildPagesMetaT> {
    const query = /* GraphGL */ `
    query getMetadataNewsSingle($locale: I18NLocaleCode, $filters: NewFiltersInput) {
      news(locale: $locale, filters: $filters) {
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
        news: { 
          data: { attributes : ChildPagesMetaT }[]
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata News Single",
        variables: {
          locale,
          filters: {
            slug: {
              eqi: slug
            }
          }
        },
        revalidate: false
    })
    const data = ChildPagesMetaT.parse(json.data.news.data[0].attributes);

    return data;
};
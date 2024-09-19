"use server"

import { ChildPagesMetaT } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataJournal(locale: string, slug: string): Promise<ChildPagesMetaT> {
    const query = /* GraphGL */ `
    query getMetadataJournal($locale: I18NLocaleCode, $filters: JournalFiltersInput) {
      journals(locale: $locale, filters: $filters) {
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
        journals: { 
          data: { attributes : ChildPagesMetaT }[]
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata journals",
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
    const data = ChildPagesMetaT.parse(json.data.journals.data[0].attributes);

    return data;
};
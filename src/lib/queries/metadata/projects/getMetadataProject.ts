"use server"

import { ChildPagesMetaT } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataProject(locale: string, slug: string): Promise<ChildPagesMetaT> {
    const query = /* GraphGL */ `
    query getMetadataProject($locale: I18NLocaleCode, $filters: ProjectFiltersInput) {
      projects(locale: $locale, filters: $filters) {
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
        projects: { 
          data: { attributes : ChildPagesMetaT }[]
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata projects",
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
    const data = ChildPagesMetaT.parse(json.data.projects.data[0].attributes);

    return data;
};
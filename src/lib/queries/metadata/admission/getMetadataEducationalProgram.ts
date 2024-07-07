"use server"

import { ChildPagesMetaT } from "@/lib/types/additional";
import fetchData from "../../fetchData";

export default async function getMetadataEducationalProgram(locale: string, slug: string): Promise<ChildPagesMetaT> {
    const query = /* GraphGL */ `
    query getMetadataEducationalProgram($locale: I18NLocaleCode, $filters: EducationalProgramFiltersInput) {
      educationalPrograms(locale: $locale, filters: $filters) {
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
        educationalPrograms: { 
          data: { attributes : ChildPagesMetaT }[]
        } 
      }; 
    }>({ 
        query, 
        error: "Failed to fetch Metadata Educational Program",
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
    const data = ChildPagesMetaT.parse(json.data.educationalPrograms.data[0].attributes);

    return data;
};
import { notFound } from "next/navigation";
import { HashtagsT } from "../types/entities";
import fetchData from "./fetchData";

//.........................Hashtags.........................//
export const getHashtags = async ({
    locale,
    sort = "title:asc",
}: {
    locale: string,
    sort?: string;
}): Promise<HashtagsT> => {
    const query = /* GraphGL */ `
    query Hashtags($locale: I18NLocaleCode, $sort: [String]) {
        hashtags(locale: $locale, sort: $sort) {
            meta {
                pagination { total }
            }
            data {
                id
                attributes {
                    slug
                    title
                }
            }
        }
    }
    `;
  
    const json = await fetchData<{ data: { hashtags: HashtagsT }; }>({ 
        query, 
        error: "Failed to fetch Hashtags",
        variables: {
          locale,
          sort
        }
    })
  
    // await new Promise((resolve) => setTimeout(resolve, 2000))
  
    if (
        json.data.hashtags.meta.pagination.total === 0 ||
        json.data.hashtags.data.length === 0
      ) {
        notFound();
      }
  
    const hashtags = HashtagsT.parse(json.data.hashtags);
  
    return hashtags;
  };
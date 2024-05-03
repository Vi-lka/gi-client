"use server"

import { notFound } from "next/navigation";
import { dynamicContentLinksQuery } from "../dynamicContentQuery";
import { LinksT, NavBarT } from "../types/additional";
import fetchData from "./fetchData";

//.........................NavBar.........................//
export const getNavBar = async (locale: string): Promise<NavBarT | null> => {
  const sameFields = `
    subLinks {
      title
      link
    }
  `
  const query = /* GraphGL */ `
  query NavBar($locale: I18NLocaleCode) {
    navBar(locale: $locale) {
      data {
        attributes {
          info { ${sameFields} }
          structure { ${sameFields} }
          education { ${sameFields} }
          admission { ${sameFields} }
          dpo { ${sameFields} }
          science { ${sameFields} }
          projects { ${sameFields} }
          journals { ${sameFields} }
        }
      }
    }
  }
  `;

  const json = await fetchData<{ 
    data: { 
      navBar: { 
            data: {
                attributes: NavBarT 
            } | null
        } 
    };
  }>({ 
      query, 
      error: "Failed to fetch NavBar",
      variables: {
        locale
      }
  })

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  if (json.data.navBar.data === null) return null;

  const navBar = NavBarT.parse(json.data.navBar.data.attributes);

  return navBar;
};

//.........................Links.........................//
export const getLinks = async (locale: string): Promise<LinksT> => {
  const sameFields = `
    (locale: $locale) {
      data {
        attributes {
          title
          navBarConfig {
            navBarTitle
            navBarDescription
            navBarImage {
              data { attributes {url} }
            }
          }
          content {
            ${dynamicContentLinksQuery}
          }
        }
      }
    }
  `
  const query = /* GraphGL */ `
    query Links($locale: I18NLocaleCode) {
      entrancePage${sameFields}
      dpo${sameFields}
      structure${sameFields}
    }
  `;

  const json = await fetchData<{ 
      data: LinksT; 
  }>({ 
      query, 
      error: "Failed to fetch Links",
      variables: {
        locale
      }
  })

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  if (json.data === null) notFound();

  const links = LinksT.parse(json.data);

  return links;
};

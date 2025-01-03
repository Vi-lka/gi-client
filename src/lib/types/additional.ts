import { z } from "zod";
import { ImageT, ImagesArrayT, IconsBlockItemT } from "./components";

//.........................NavBar.........................//
export const SubLinkT = z.object({
  title: z.string(),
  link: z.string(),
})
export type SubLinkT = z.infer<typeof SubLinkT>;

export const NavBarT  = z.object({
  info: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
  structure: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
  education: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
  admission: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
  dpo: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
  science: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
  projects: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
  journals: z.object({
    subLinks: SubLinkT.array()
  }).nullable(),
})
export type NavBarT = z.infer<typeof NavBarT>;




//.........................Links.........................//
export const LinksItemT = z.object({
  title: z.string(),
  navBarConfig: z.object({
    navBarTitle: z.string().nullable(),
    navBarDescription: z.string().nullable(),
    navBarImage: z.lazy(() => ImageT),
  }).nullable(),
  content: z.object({
    title: z.string().nullable(),
    link: z.string().nullable(),
    linkTitle: z.string().nullable(),
    linkDescription: z.string().nullable(),
    titleSecond: z.string().nullable().optional(),
    linkSecond: z.string().nullable().optional(),
    linkSecondTitle: z.string().nullable().optional(),
    linkSecondDescription: z.string().nullable().optional(),
  }).array()
})
export type LinksItemT = z.infer<typeof LinksItemT>;

export const LinksT  = z.object({
  entrancePage: z.object({
    data: z.object({
      attributes: LinksItemT
    }).nullable()
  }),
  dpo: z.object({
    data: z.object({
      attributes: LinksItemT
    }).nullable()
  }),
  structure: z.object({
    data: z.object({
      attributes: LinksItemT
    }).nullable()
  }),
  info: z.object({
    data: z.object({
      attributes: LinksItemT
    }).nullable()
  }),
  educationPage: z.object({
    data: z.object({
      attributes: LinksItemT
    }).nullable()
  }),
  projectsPage: z.object({
    data: z.object({
      attributes: LinksItemT
    }).nullable()
  }),
  journalsPage: z.object({
    data: z.object({
      attributes: LinksItemT
    }).nullable()
  }),
})
export type LinksT = z.infer<typeof LinksT>;



//.........................Hero.........................//
export const HeroAboutT  = z.object({
  icons: z.lazy(() => ImagesArrayT),
  items: z.lazy(() => IconsBlockItemT).array(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
})
export type HeroAboutT = z.infer<typeof HeroAboutT>;




//.........................Footer.........................//
export const FooterT  = z.object({
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  socialNetworks: z.object({
    link: z.string(),
    iconReact: z.string().nullable(),
    image: z.lazy(() => ImageT),
    imageDark: z.lazy(() => ImageT),
  }).array(),
  contacts: z.object({
    title: z.string().nullable(),
    phone: z.string().nullable(),
    email: z.string().nullable(),
    location: z.string().nullable(),
    iconReact: z.string().nullable(),
  }).array(),
  logos: z.object({
    link: z.string().nullable(),
    image: z.lazy(() => ImageT),
    imageDark: z.lazy(() => ImageT),
  }).array(),
  copyright: z.string().nullable(),
})
export type FooterT = z.infer<typeof FooterT>;






//.........................Site Description.........................//
export const i18NLocale = z.object({
  id: z.string(),
  attributes: z.object({
    code: z.string(),
    name: z.string()
  })
})
export type i18NLocale = z.infer<typeof i18NLocale>;

export const i18NLocales = i18NLocale.array()
export type i18NLocales = z.infer<typeof i18NLocales>;





//.........................Site Description.........................//
export const SiteDescriptionT = z.object({
  title: z.string(),
  abbreviation: z.string(),
  description: z.string(),
  keywords: z.object({
    word: z.string()
  }).array(),
  category: z.string().nullable(),
  publisher:  z.string().nullable(),
  image: ImageT
})
export type SiteDescriptionT = z.infer<typeof SiteDescriptionT>;




//.........................Pages Metadata.........................//
export const ParentPagesMetaT = z.object({
  title: z.string(),
  navBarConfig: z.object({ 
    navBarDescription: z.string().nullable(),
    navBarImage: z.lazy(() => ImageT),
  }).nullable(),
})
export type ParentPagesMetaT = z.infer<typeof ParentPagesMetaT>;

export const ChildPagesMetaT = z.object({
  title: z.string(),
  slug: z.string(),
  image: z.lazy(() => ImageT),
  description: z.string().nullable().optional()
})
export type ChildPagesMetaT = z.infer<typeof ChildPagesMetaT>;
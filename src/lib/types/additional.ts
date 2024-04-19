import { z } from "zod";
import { ImageT, ImagesArrayT, IconsBlockItemT, CustomIconEnum } from "./components";

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
    navBarImage: ImageT,
  }).nullable(),
  content: z.object({
    title: z.string().nullable(),
    link: z.string().nullable(),
    linkTitle: z.string().nullable(),
    linkDescription: z.string().nullable(),
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
  })
})
export type LinksT = z.infer<typeof LinksT>;



//.........................Hero.........................//
export const HeroAboutT  = z.object({
  icons: ImagesArrayT,
  items: IconsBlockItemT.array(),
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
    image: ImageT,
    imageDark: ImageT,
  }).array(),
  contacts: z.object({
    title: z.string().nullable(),
    phone: z.string().nullable(),
    email: z.string().nullable(),
    location: z.string().nullable(),
    iconReact: z.string().nullable(),
    iconCustom: CustomIconEnum.nullable(),
  }).array(),
  logos: z.object({
    link: z.string().nullable(),
    image: ImageT,
    imageDark: ImageT,
  }).array(),
  copyright: z.string().nullable(),
})
export type FooterT = z.infer<typeof FooterT>;
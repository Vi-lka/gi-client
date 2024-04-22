import { z } from "zod";
import { DynamicZoneT, ImageT, ImagesArrayT } from "./components";
import { EducationalProgramTypeEnum } from "./entities";

//..................................................Pages..................................................//

//.........................Main Page.........................//
export const MainPageT  = z.object({
  attributes: z.object({
    content: DynamicZoneT.array(),
  }),
})
export type MainPageT = z.infer<typeof MainPageT>;




//.........................JustWait Page.........................//
export const JustWaitPageT  = z.object({
  attributes: z.object({
    title: z.string(),
    content: DynamicZoneT.array(),
  }),
})
export type JustWaitPageT = z.infer<typeof JustWaitPageT>;




//.........................Entrance Page.........................//
export const EntrancePageT  = z.object({
  attributes: z.object({
    title: z.string(),
    navBarConfig: z.object({ 
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: DynamicZoneT.array(),
  }),
})
export type EntrancePageT = z.infer<typeof EntrancePageT>;




//.........................Educational Program Page.........................//
export const EducationalProgramPageT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    type: EducationalProgramTypeEnum,
    code: z.string().nullable(),
    mainName: z.string().nullable(),
    mainCode: z.string().nullable(),
    image: ImageT,
    content: DynamicZoneT.array(),
  }),
})
export type EducationalProgramPageT = z.infer<typeof EducationalProgramPageT>;




//.........................DPO Page.........................//
export const DpoPageT  = z.object({
  attributes: z.object({
    title: z.string(),
    navBarConfig: z.object({ 
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: DynamicZoneT.array(),
  }),
})
export type DpoPageT = z.infer<typeof DpoPageT>;




//.........................DPO Course Page.........................//
export const DpoCoursePageT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    dateStart: z.coerce.date().nullable(),
    dateEnd: z.coerce.date().nullable(),
    location: z.string().nullable(),
    hours: z.number().nullable(),
    price: z.string().nullable(),
    image: ImageT,
    content: DynamicZoneT.array(),
  }),
})
export type DpoCoursePageT = z.infer<typeof DpoCoursePageT>;




//.........................Structure Page.........................//
export const StructurePageT  = z.object({
  attributes: z.object({
    title: z.string(),
    navBarConfig: z.object({
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: DynamicZoneT.array(),
  }),
})
export type StructurePageT = z.infer<typeof StructurePageT>;




//.........................Structure Single Page.........................//
export const StructureSinglePageT  = z.object({
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    media: ImagesArrayT,
    description_title: z.string().nullable(),
    description: z.any(),
    contacts: z.object({
      url: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.string().nullable(),
      location: z.string().nullable(),
    }).nullable(),
    content: DynamicZoneT.array(),
  }),
})
export type StructureSinglePageT = z.infer<typeof StructureSinglePageT>;




//..................................................Additional Pages..................................................//
export const AdditionalPageSingleT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    navBarConfig: z.object({
      navBarTitle: z.string().nullable()
    }).nullable(),
    additional_pages: z.object({
      data: z.object({
        attributes: z.object({
          slug: z.string(),
          title: z.string(),
          navBarConfig: z.object({
            navBarTitle: z.string().nullable()
          }).nullable(),
        })
      }).array()
    }),
    content: DynamicZoneT.array(),
  }),
})
export type AdditionalPageSingleT = z.infer<typeof AdditionalPageSingleT>;

export const AdditionalPagesT = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: AdditionalPageSingleT.array(),
})
export type AdditionalPagesT = z.infer<typeof AdditionalPagesT>;
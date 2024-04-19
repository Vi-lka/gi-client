import { z } from "zod";
import { DynamicZoneT, ImageT } from "./components";
import { EducationalProgramTypeEnum } from "./entities";

//.........................Pages.........................//
export const MainPageT  = z.object({
  attributes: z.object({
    content: DynamicZoneT.array(),
  }),
})
export type MainPageT = z.infer<typeof MainPageT>;

export const JustWaitPageT  = z.object({
  attributes: z.object({
    title: z.string(),
    content: DynamicZoneT.array(),
  }),
})
export type JustWaitPageT = z.infer<typeof JustWaitPageT>;

export const EntrancePageT  = z.object({
  attributes: z.object({
    title: z.string(),
    content: DynamicZoneT.array(),
  }),
})
export type EntrancePageT = z.infer<typeof EntrancePageT>;

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

export const DpoPageT  = z.object({
  attributes: z.object({
    title: z.string(),
    content: DynamicZoneT.array(),
  }),
})
export type DpoPageT = z.infer<typeof DpoPageT>;

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

export const AdditionalPageSingleT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    additional_pages: z.object({
      data: z.object({
        attributes: z.object({
          slug: z.string(),
          title: z.string(),
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
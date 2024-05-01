import { z } from "zod";
import { DynamicZoneT, ImageT, ImagesArrayT } from "./components";
import { EducationalProgramTypeEnum, HashtagSingleT } from "./entities";

//..................................................Pages..................................................//

//.........................Main Page.........................//
export const MainPageT  = z.object({
  attributes: z.object({
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type MainPageT = z.infer<typeof MainPageT>;




//.........................JustWait Page.........................//
export const JustWaitPageT  = z.object({
  attributes: z.object({
    title: z.string(),
    content: z.lazy(() => DynamicZoneT).array(),
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
    content: z.lazy(() => DynamicZoneT).array(),
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
    image: z.lazy(() => ImageT),
    content: z.lazy(() => DynamicZoneT).array(),
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
    content: z.lazy(() => DynamicZoneT).array(),
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
    image: z.lazy(() => ImageT),
    content: z.lazy(() => DynamicZoneT).array(),
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
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type StructurePageT = z.infer<typeof StructurePageT>;




//.........................Employees Page.........................//
export const EmployeesPageT  = z.object({
  attributes: z.object({
    title: z.string(),
    navBarConfig: z.object({
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type EmployeesPageT = z.infer<typeof EmployeesPageT>;




//.........................Employee Single Page.........................//
export const EmployeeSinglePageT  = z.object({
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.lazy(() => ImageT),
    meta: z.object({
      post: z.string().nullable(),
      degree: z.string().nullable(),
      degreeShort: z.string().nullable(),
      rank: z.string().nullable(),
      rankShort: z.string().nullable(),
    }).nullable(),
    description: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    location: z.string().nullable(),
    hashtags: z.object({
      data: z.lazy(() => HashtagSingleT).array()
    }),
    head_in_department: z.object({
      data: z.object({
        attributes: z.object({
          shortTitle: z.string(),
          slug: z.string()
        })
      }).nullable()
    }),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type EmployeeSinglePageT = z.infer<typeof EmployeeSinglePageT>;




//.........................Structure Single Page.........................//
export const DepartmentSinglePageT  = z.object({
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    media: z.lazy(() => ImagesArrayT),
    description_title: z.string().nullable(),
    description: z.any(),
    contacts: z.object({
      url: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.string().nullable(),
      location: z.string().nullable(),
    }).nullable(),
    head: z.object({
      data: z.object({
        id: z.string(),
        attributes: z.object({
          slug: z.string(),
          title: z.string()
        })
      }).nullable()
    }),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type DepartmentSinglePageT = z.infer<typeof DepartmentSinglePageT>;




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
    content: z.lazy(() => DynamicZoneT).array(),
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
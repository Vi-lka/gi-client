import { z } from "zod";
import { DynamicZoneT, ImageT, ImagesArrayT } from "./components";
import { EducationalProgramTypeEnum, EventDayT, HashtagSingleT } from "./entities";

//..................................................Pages..................................................//
export const PagesEnum = z.enum([
  "/", 
  "/admission", 
  "/dpo",
  "/education",
  "/education/programs",
  "/info",
  "/info/events",
  "/info/news",
  "/journals",
  "/projects",
  "/structure",
  "/structure/employees",
]);
export type PagesEnum = z.infer<typeof PagesEnum>;


//.........................Main Page.........................//
export const MainPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/"]).optional(),
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
    slug: PagesEnum.extract(["/admission"]).optional(),
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
    slug: PagesEnum.extract(["/dpo"]).optional(),
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
    slug: PagesEnum.extract(["/structure"]).optional(),
    title: z.string(),
    navBarConfig: z.object({
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type StructurePageT = z.infer<typeof StructurePageT>;




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




//.........................Employees Page.........................//
export const EmployeesPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/structure/employees"]).optional(),
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
      posts: z.object({
        post: z.string(),
        department: z.object({
          data: z.object({
            attributes: z.object({
              slug: z.string(),
              title: z.string(),
              shortTitle: z.string(),
            })
          })
        })
      }).array(),
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




//.........................Info Page.........................//
export const InfoPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/info"]).optional(),
    title: z.string(),
    navBarConfig: z.object({
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type InfoPageT = z.infer<typeof InfoPageT>;




//.........................News Page.........................//
export const NewsPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/info/news"]).optional(),
    title: z.string(),
    navBarConfig: z.object({
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type NewsPageT = z.infer<typeof NewsPageT>;

export const NewsSinglePageT  = z.object({
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.lazy(() => ImageT),
    text: z.any(),
    publishedAt: z.string().pipe( z.coerce.date() ),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type NewsSinglePageT = z.infer<typeof NewsSinglePageT>;




//.........................News Page.........................//
export const EventsPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/info/events"]).optional(),
    title: z.string(),
    navBarConfig: z.object({
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type EventsPageT = z.infer<typeof EventsPageT>;

export const EventsSinglePageT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.lazy(() => ImageT),
    showSchedule: z.boolean(),
    location: z.string(),
    online: z.string().nullable(),
    text: z.any(),
    dateStart: z.string().pipe( z.coerce.date() ),
    dateEnd: z.string().pipe( z.coerce.date() ).nullable(),
    days: z.lazy(() => EventDayT).array(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type EventsSinglePageT = z.infer<typeof EventsSinglePageT>;




//.........................Education Page.........................//
export const EducationPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/education"]).optional(),
    title: z.string(),
    navBarConfig: z.object({ 
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type EducationPageT = z.infer<typeof EducationPageT>;

export const EduEducationalProgramPageT  = z.object({
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
export type EduEducationalProgramPageT = z.infer<typeof EduEducationalProgramPageT>;





//.........................Projects Page.........................//
export const ProjectsPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/projects"]).optional(),
    title: z.string(),
    navBarConfig: z.object({ 
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type ProjectsPageT = z.infer<typeof ProjectsPageT>;


//.........................Project Single Page.........................//
export const ProjectMember = z.object({
  __typename: z.literal("ComponentProjectsProjectMember"),
  description: z.string().nullable(),
  member: z.object({
    data: z.object({
      attributes: z.object({
        title: z.string(),
        slug: z.string(),
        image: z.lazy(() => ImageT),
      })
    }).nullable()
  })
})
export type ProjectMember = z.infer<typeof ProjectMember>;

export const ProjectMemberOutSide = z.object({
  __typename: z.literal("ComponentProjectsProjectMemberOutSide"),
  title: z.string(),
  description: z.string().nullable(),
  link: z.string().nullable(),
  image: z.lazy(() => ImageT),
})
export type ProjectMemberOutSide = z.infer<typeof ProjectMemberOutSide>;

export const ProjectDynamicMemberT = z.discriminatedUnion("__typename", [
  ProjectMember,
  ProjectMemberOutSide
])
export type ProjectDynamicMemberT = z.infer<typeof ProjectDynamicMemberT>;

export const ProjectSinglePageT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    year: z.number().nullable(),
    head: z.object({
      title: z.string(),
      link: z.string().nullable(),
      description: z.string().nullable(),
      image: z.lazy(() => ImageT),
    }).nullable(),
    image: z.lazy(() => ImageT),
    text: z.any(),
    members: ProjectDynamicMemberT.array(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type ProjectSinglePageT = z.infer<typeof ProjectSinglePageT>;




//.........................Journals Page.........................//
export const JournalsPageT  = z.object({
  attributes: z.object({
    slug: PagesEnum.extract(["/journals"]).optional(),
    title: z.string(),
    navBarConfig: z.object({ 
      navBarTitle: z.string().nullable()
    }).nullable(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type JournalsPageT = z.infer<typeof JournalsPageT>;


//.........................Journal Single Page.........................//
export const JournalSinglePageT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    content: z.lazy(() => DynamicZoneT).array(),
  }),
})
export type JournalSinglePageT = z.infer<typeof JournalSinglePageT>;




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
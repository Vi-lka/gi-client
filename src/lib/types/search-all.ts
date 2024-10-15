import { z } from "zod";
import { 
    AdditionalPagesT, 
    DpoPageT,  
    EducationPageT,  
    EmployeesPageT,  
    EntrancePageT, 
    EventsPageT, 
    InfoPageT, 
    JournalsPageT, 
    MainPageT, 
    NewsPageT, 
    ProjectDynamicMemberT, 
    ProjectsPageT, 
    StructurePageT
} from "./pages";
import { 
    EventDayT,
    HashtagSingleT,
} from "./entities";
import { DynamicZoneT, ImageT } from "./components";

//.........................Educational Programs.........................//
export const EducationalProgramSearchT = z.object({
    __typename: z.literal("EducationalProgramEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        code: z.string().nullable(),
        mainName: z.string().nullable(),
        mainCode: z.string().nullable(),
        image: z.lazy(() => ImageT),
        content: z.lazy(() => DynamicZoneT).array(),
    }),
})
export type EducationalProgramSearchT = z.infer<typeof EducationalProgramSearchT>;

export const EduEducationalProgramSearchT = z.object({
    __typename: z.literal("EduEducationalProgramEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        code: z.string().nullable(),
        mainName: z.string().nullable(),
        mainCode: z.string().nullable(),
        image: z.lazy(() => ImageT),
        content: z.lazy(() => DynamicZoneT).array(),
    }),
})
export type EduEducationalProgramSearchT = z.infer<typeof EduEducationalProgramSearchT>;

//.........................Dpo Courses.........................//
export const DpoCourseSearchT = z.object({
    __typename: z.literal("DpoCourseEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        dateStart: z.coerce.date().nullable(),
        dateEnd: z.coerce.date().nullable(),
        location: z.string().nullable(),
        hours: z.number().nullable(),
        price: z.string().nullable(),
        image: z.lazy(() => ImageT),
        content: z.lazy(() => DynamicZoneT).array(),
    }),
})
export type DpoCourseSearchT = z.infer<typeof DpoCourseSearchT>;

//.........................Employees.........................//
export const EmployeeSearchT = z.object({
    __typename: z.literal("EmployeeEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().nullable(),
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
        email: z.string().nullable(),
        phone: z.string().nullable(),
        location: z.string().nullable(),
        hashtags: z.object({
            data: z.lazy(() => HashtagSingleT).array()
        }),
        head_in_department: z.object({
            data: z.object({
                attributes: z.object({
                    slug: z.string(),
                    title: z.string(),
                    shortTitle: z.string(),
                })
            }).nullable()
        }),
        departments: z.object({
            data: z.object({
                attributes: z.object({
                    slug: z.string(),
                    title: z.string(),
                    shortTitle: z.string(),
                })
            }).array()
        }),
        content: z.lazy(() => DynamicZoneT).array(),
    })
})
export type EmployeeSearchT = z.infer<typeof EmployeeSearchT>;

//.........................Departments.........................//
export const DepartmentSearchT = z.object({
    __typename: z.literal("DepartmentEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        image: z.lazy(() => ImageT),
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
    })
})
export type DepartmentsSearchT = z.infer<typeof DepartmentSearchT>;

//.........................News.........................//
export const NewsSearchT = z.object({
    __typename: z.literal("NewEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        image: z.lazy(() => ImageT),
        text: z.any(),
        publishedAt: z.string().pipe( z.coerce.date() ),
        content: z.lazy(() => DynamicZoneT).array(),
    }),
})
export type NewsSearchT = z.infer<typeof NewsSearchT>;

//.........................Events.........................//
export const EventSearchT = z.object({
    __typename: z.literal("EventEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        image: z.lazy(() => ImageT),
        location: z.string(),
        online: z.string().nullable(),
        text: z.any(),
        dateStart: z.string().pipe( z.coerce.date() ),
        dateEnd: z.string().pipe( z.coerce.date() ).nullable(),
        days: z.lazy(() => EventDayT).array(),
        content: z.lazy(() => DynamicZoneT).array(),
    })
})
export type EventSearchT = z.infer<typeof EventSearchT>;

//.........................Projects.........................//
export const ProjectSearchT = z.object({
    __typename: z.literal("ProjectEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        text: z.any(),
        year: z.number().nullable(),
        image: z.lazy(() => ImageT),
        head: z.object({
          title: z.string(),
          link: z.string().nullable(),
          description: z.string().nullable(),
          image: z.lazy(() => ImageT),
        }).nullable(),
        members: z.lazy(() => ProjectDynamicMemberT).array(),
        content: z.lazy(() => DynamicZoneT).array(),
    })
})
export type ProjectSearchT = z.infer<typeof ProjectSearchT>;

//.........................Journals.........................//
export const JournalSearchT = z.object({
    __typename: z.literal("JournalEntity").optional(),
    attributes: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        image: z.lazy(() => ImageT),
        content: z.lazy(() => DynamicZoneT).array(),
    })
})
export type JournalSearchT = z.infer<typeof JournalSearchT>;

//..................................................Search All Result..................................................//
export const SearchAllResultT = z.object({
    mainPage: z.object({
        data: z.lazy(() => MainPageT)
    }),
    entrancePage: z.object({
        data: z.lazy(() => EntrancePageT)
    }),
    dpo: z.object({
        data: z.lazy(() => DpoPageT)
    }),
    structure: z.object({
        data: z.lazy(() => StructurePageT)
    }),
    employeesPage: z.object({
        data: z.lazy(() => EmployeesPageT)
    }),
    info: z.object({
        data: z.lazy(() => InfoPageT)
    }),
    newsPage: z.object({
        data: z.lazy(() => NewsPageT)
    }),
    eventsPage: z.object({
        data: z.lazy(() => EventsPageT)
    }),
    educationPage: z.object({
        data: z.lazy(() => EducationPageT)
    }),
    projectsPage: z.object({
        data: z.lazy(() => ProjectsPageT)
    }),
    journalsPage: z.object({
        data: z.lazy(() => JournalsPageT)
    }),
    additionalPages: z.lazy(() => AdditionalPagesT),
    educationalPrograms: z.object({
        data: EducationalProgramSearchT.array()
    }),
    eduEducationalPrograms: z.object({
        data: EduEducationalProgramSearchT.array()
    }),
    dpoCourses: z.object({
        data: DpoCourseSearchT.array()
    }),
    employees: z.object({
        data: EmployeeSearchT.array()
    }),
    departments: z.object({
        data: DepartmentSearchT.array()
    }),
    news: z.object({
        data: NewsSearchT.array()
    }),
    events: z.object({
        data: EventSearchT.array()
    }),
    projects: z.object({
        data: ProjectSearchT.array()
    }),
    journals: z.object({
        data: JournalSearchT.array()
    }),
});
export type SearchAllResultT = z.infer<typeof SearchAllResultT>;
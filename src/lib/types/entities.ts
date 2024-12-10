import { z } from "zod";
import { ImageT } from "./components";

//.........................Hashtags.........................//
export const HashtagSingleT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string()
  })
})
export type HashtagSingleT = z.infer<typeof HashtagSingleT>;

export const HashtagsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: HashtagSingleT.array(),
})
export type HashtagsT = z.infer<typeof HashtagsT>;




//.........................Educational Programs.........................//
export const EducationalProgramTypeEnum = z.enum(["bachelor", "magistracy", "postgraduate"]);
export type EducationalProgramTypeEnum = z.infer<typeof EducationalProgramTypeEnum>;
export const EducationalProgramSingleT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    type: EducationalProgramTypeEnum,
    code: z.string().nullable(),
    mainName: z.string().nullable(),
    mainCode: z.string().nullable(),
    image: z.lazy(() => ImageT),
  }),
})
export type EducationalProgramSingleT = z.infer<typeof EducationalProgramSingleT>;

export const EducationalProgramsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: EducationalProgramSingleT.array(),
})
export type EducationalProgramsT = z.infer<typeof EducationalProgramsT>;



//.........................Dpo Courses.........................//
export const DpoCoursesSingleT  = z.object({
  id: z.string(),
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
  }),
})
export type DpoCoursesSingleT = z.infer<typeof DpoCoursesSingleT>;

export const DpoCoursesT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: DpoCoursesSingleT.array(),
})
export type DpoCoursesT = z.infer<typeof DpoCoursesT>;




//.........................Employees.........................//
export const EmployeeSingleT  = z.object({
  id: z.string(),
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
              shortTitle: z.string(),
              slug: z.string(),
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
      data: HashtagSingleT.array()
    }),
    head_in_department: z.object({
      data: z.object({
        attributes: z.object({
          shortTitle: z.string(),
          slug: z.string()
        })
      }).nullable()
    }),
    departments: z.object({
      data: z.object({
        attributes: z.object({
          shortTitle: z.string(),
          slug: z.string()
        })
      }).array()
    }),
    showContacts: z.boolean(),
    showHashtags: z.boolean()
  })
})
export type EmployeeSingleT = z.infer<typeof EmployeeSingleT>;

export const EmployeesT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: EmployeeSingleT.array(),
})
export type EmployeesT = z.infer<typeof EmployeesT>;




//.........................Graduates.........................//
export const GraduateSingleT  = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string(),
    description: z.string().nullable(),
    additionalInfo: z.string().nullable(), 
    image: z.lazy(() => ImageT),
    educational_programs: z.object({
      data: EducationalProgramSingleT.array()
    }),
    oldPrograms: z.object({
      title: z.string(),
      type: EducationalProgramTypeEnum,
      code: z.string().nullable(),
      mainName: z.string().nullable(),
      mainCode: z.string().nullable(),
    }).array()
  }),
})
export type GraduateSingleT = z.infer<typeof GraduateSingleT>;

export const GraduatesT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: GraduateSingleT.array(),
})
export type GraduatesT = z.infer<typeof GraduatesT>;




//.........................Departments (Structures).........................//
export const StructureCategoryEnum = z.enum([
  "Administration",
  "Science",
  "Education",
]);
export type StructureCategoryEnum = z.infer<typeof StructureCategoryEnum>;

export const DepartmentsTypeT = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string(),
    category: StructureCategoryEnum,
  }),
})
export type DepartmentsTypeT = z.infer<typeof DepartmentsTypeT>;

export const DepartmentSingleT = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.lazy(() => ImageT),
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
  }),
})
export type DepartmentSingleT = z.infer<typeof DepartmentSingleT>;

export const DepartmentsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: DepartmentSingleT.array(),
})
export type DepartmentsT = z.infer<typeof DepartmentsT>;





//.........................News.........................//
export const NewSingleT = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.lazy(() => ImageT),
    publishedAt: z.string().pipe( z.coerce.date() )
  }),
})
export type NewSingleT = z.infer<typeof NewSingleT>;

export const NewsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: NewSingleT.array(),
})
export type NewsT = z.infer<typeof NewsT>;





//.........................Events.........................//
export const EventPointT = z.object({
  time: z.string(),
  description: z.string(),
  text: z.any(),
})
export type EventPointT = z.infer<typeof EventPointT>;

export const EventDayT = z.object({
  id: z.string(),
  title: z.string().nullable(),
  date: z.string().pipe( z.coerce.date() ),
  points: EventPointT.array()
})
export type EventDayT = z.infer<typeof EventDayT>;

export const EventSingleT = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.lazy(() => ImageT),
    location: z.string(),
    online: z.string().nullable(),
    text: z.any(),
    dateStart: z.string().pipe( z.coerce.date() ),
    dateEnd: z.string().pipe( z.coerce.date() ).nullable(),
    days: EventDayT.array()
  }),
})
export type EventSingleT = z.infer<typeof EventSingleT>;

export const EventsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: EventSingleT.array(),
})
export type EventsT = z.infer<typeof EventsT>;



//.........................Groups.........................//
export const ExamT = z.object({
  date: z.string().pipe( z.coerce.date() ),
  time: z.string().nullable().optional(),
  name: z.string(),
  address: z.string(),
  teacher: z.object({
    data: z.object({
      id: z.string(),
      attributes: z.object({ 
        slug: z.string(),
        title: z.string(),
      })
    }).nullable()
  }),
  description: z.string().nullable()
});
export type ExamT = z.infer<typeof ExamT>;

export const DiplomaT = z.object({
  date: z.string().pipe( z.coerce.date() ),
  time: z.string().nullable().optional(),
  name: z.string(),
  address: z.string(),
  chairman: z.string(),
  description: z.string().nullable()
});
export type DiplomaT = z.infer<typeof DiplomaT>;

export const HolidaysT = z.object({
  dateStart: z.string().pipe( z.coerce.date() ),
  dateEnd: z.string().pipe( z.coerce.date() ).nullable(),
  description: z.string().nullable()
});
export type HolidaysT = z.infer<typeof HolidaysT>;

export const RangeDatesT = z.object({
  date: z.string().pipe( z.coerce.date() ),
  description: z.string().nullable(),
  dateStart: z.string().pipe( z.coerce.date() ),
  dateEnd: z.string().pipe( z.coerce.date() ).nullable(),
})
export type RangeDatesT = z.infer<typeof RangeDatesT>;

export const CourseEnumValues = [
  "bachelor_1",
  "bachelor_2",
  "bachelor_3",
  "bachelor_4",
  "magistracy_1",
  "magistracy_2",
  "postgraduate_1",
  "postgraduate_2",
  "postgraduate_3",
  "postgraduate_4",
] as const;
export const GroupCourseEnum = z.enum(CourseEnumValues);
export type GroupCourseEnum = z.infer<typeof GroupCourseEnum>;

export const GroupSingleT = z.object({
  id: z.string(),
  attributes: z.object({
    title: z.string(),
    course: GroupCourseEnum,
    exams: ExamT.array(),
    tests: ExamT.array(),
    stateExams: DiplomaT.array(),
    diplomas: DiplomaT.array(),
    rescheduling: ExamT.array(),
    retakes: ExamT.array(),
    eduPractices: HolidaysT.array(),
    internships: HolidaysT.array(),
    holidays: HolidaysT.array(),
    preGraduatePractices: HolidaysT.array(),
  })
});
export type GroupSingleT = z.infer<typeof GroupSingleT>;

export const GroupsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: GroupSingleT.array(),
})
export type GroupsT = z.infer<typeof GroupsT>;





//.........................Projects.........................//
export const ProjectsSingleT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    year: z.number().nullable(),
    head: z.object({
      title: z.string(),
      link: z.string().nullable(),
    }).nullable(),
    image: z.lazy(() => ImageT),
  }),
})
export type ProjectsSingleT = z.infer<typeof ProjectsSingleT>;

export const ProjectsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: ProjectsSingleT.array(),
})
export type ProjectsT = z.infer<typeof ProjectsT>;





//.........................Journals.........................//
export const JournalsSingleT  = z.object({
  id: z.string(),
  attributes: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    image: z.lazy(() => ImageT),
  }),
})
export type JournalsSingleT = z.infer<typeof JournalsSingleT>;

export const JournalsT  = z.object({
  meta: z.object({
    pagination: z.object({
      total: z.number(),
    }),
  }),
  data: JournalsSingleT.array(),
})
export type JournalsT = z.infer<typeof JournalsT>;




//.........................Weekends.........................//
export const WeekendsT = z.object({
  attributes: z.object({
    days: HolidaysT.array(),
  })
});
export type WeekendsT = z.infer<typeof WeekendsT>;
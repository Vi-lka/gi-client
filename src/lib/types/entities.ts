import { z } from "zod";
import { ImageT } from "./components";

//.........................Hashtags.........................//
export const HashtagSingleT  = z.object({
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
      data: HashtagSingleT.array()
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
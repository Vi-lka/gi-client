import { z } from "zod";


//.........................FORMS.........................//
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const ContactFormT = z.object({
  place: z.string().optional(),
  path: z.string().optional(),
  username: z.string().min(2, {
    message: "min2symbols",
  }),
  email: z.string().email({ message: "email" }),
  phone: z.string().regex(phoneRegex, 'phone'),
  formTitle: z.string().nullable().optional(),
  formDescription: z.string().nullable().optional(),
})
export type ContactFormT = z.infer<typeof ContactFormT>;




//.........................IMAGES.........................//
export const ImageT = z.object({
  data: z
    .object({
      attributes: z.object({
        url: z.string(),
      }),
    })
    .nullable(),
});
export type ImageT = z.infer<typeof ImageT>;

export const ImagesArrayT = z.object({
data: z
  .object({
    attributes: z.object({
      url: z.string(),
    }),
  })
  .array(),
});
export type ImagesArrayT = z.infer<typeof ImagesArrayT>;




//.........................Custom Icon Enums.........................//
export const CustomIconEnum = z.enum([
  "deal",
  "science",
  "idea",
  "healthy_mind",
  "video_call",
  "presentation",
  "man_desktop",
  "businessman",
  "certificate",
  "budget",
  "deadline",
  "authentication",
  "graph",
]);
export type CustomIconEnum = z.infer<typeof CustomIconEnum>;




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
    image: ImageT,
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
    dateStart: z.coerce.date().nullable(),
    dateEnd: z.coerce.date().nullable(),
    location: z.string().nullable(),
    hours: z.number().nullable(),
    price: z.string().nullable(),
    image: ImageT,
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
    title: z.string(),
    image: ImageT,
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
    image: ImageT,
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




//.........................COMPONENTS.........................//
export const TextCompT = z.object({
  __typename: z.literal("ComponentContentTextBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  text: z.any(),
})
export type TextCompT = z.infer<typeof TextCompT>;

export const AlignEnum = z.enum(["left", "right"]);
export type AlignEnum = z.infer<typeof AlignEnum>;
export const TextImagesCompT = z.object({
  __typename: z.literal("ComponentContentTextImages"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  text: z.any(),
  alignImages: AlignEnum,
  images: ImagesArrayT,
})
export type TextImagesCompT = z.infer<typeof TextImagesCompT>;

export const TextGridItemT = z.object({
  title: z.string(),
  text: z.any(),
})
export type TextGridItemT = z.infer<typeof TextGridItemT>;
export const TextGridCompT = z.object({
  __typename: z.literal("ComponentContentTextGrid"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: TextGridItemT.array(),
  buttonTitle: z.string().nullable(),
  buttonLink: z.string().nullable(),
})
export type TextGridCompT = z.infer<typeof TextGridCompT>;

export const CollectionAllEnum = z.enum([
  "educational-programs", 
  "dpo-courses", 
  "graduates",
  "employees",
]);
export type CollectionAllEnum = z.infer<typeof CollectionAllEnum>;
export const CollectionAllCompT = z.object({
  __typename: z.literal("ComponentContentCollectionAll"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  entity: CollectionAllEnum.array()
})
export type CollectionAllCompT = z.infer<typeof CollectionAllCompT>;

export const ContactsCompT = z.object({
  __typename: z.literal("ComponentContentContacts"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  location: z.string().nullable(),
  image: ImageT,
})
export type ContactsCompT = z.infer<typeof ContactsCompT>;

export const IconsBlockItemT = z.object({
  title: z.string(),
  iconReact: z.string().nullable(),
  iconCustom: CustomIconEnum.nullable(),
  description: z.string().nullable(),
})
export type IconsBlockItemT = z.infer<typeof IconsBlockItemT>;

export const IconsBlockCompT = z.object({
  __typename: z.literal("ComponentContentIconsBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  backgroundOn: z.boolean(),
  isList: z.boolean(),
  image: ImageT,
  alignImage: AlignEnum,
  items: IconsBlockItemT.array(),
  moreTitle: z.string().nullable(),
  moreLink: z.string().nullable(),
})
export type IconsBlockCompT = z.infer<typeof IconsBlockCompT>;

export const SliderEntityCompT = z.object({
  __typename: z.literal("ComponentContentSliderEntity"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  educational_programs: z.object({
    data: EducationalProgramSingleT.array()
  }),
  employees: z.object({
    data: EmployeeSingleT.array()
  }),
  graduates: z.object({
    data: GraduateSingleT.array()
  }),
  dpo_courses: z.object({
    data: DpoCoursesSingleT.array()
  })
})
export type SliderEntityCompT = z.infer<typeof SliderEntityCompT>;

export const SliderPhotosCompT = z.object({
  __typename: z.literal("ComponentContentSliderPhotos"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  photos: ImagesArrayT,
})
export type SliderPhotosCompT = z.infer<typeof SliderPhotosCompT>;

export const TimelineItemT = z.object({
  title: z.string().nullable(),
  text: z.any(),
})
export type TimelineItemT = z.infer<typeof TimelineItemT>;
export const TimelineCompT = z.object({
  __typename: z.literal("ComponentContentTimeline"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  subTitle: z.string().nullable(),
  line: TimelineItemT.array(),
})
export type TimelineCompT = z.infer<typeof TimelineCompT>;

export const NumbersItemT = z.object({
  number: z.number(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
})
export type NumbersItemT = z.infer<typeof NumbersItemT>;
export const NumbersCompT = z.object({
  __typename: z.literal("ComponentContentNumbers"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  subTitle: z.string().nullable(),
  items: NumbersItemT.array(),
})
export type NumbersCompT = z.infer<typeof NumbersCompT>;

export const FilesItemT = z.object({
  title: z.string(),
  file: z.object({
    data: z
      .object({
        attributes: z.object({
          url: z.string(),
        }),
      })
  })
})
export type FilesItemT = z.infer<typeof FilesItemT>;
export const FilesCompT = z.object({
  __typename: z.literal("ComponentContentFiles"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: FilesItemT.array(),
})
export type FilesCompT = z.infer<typeof FilesCompT>;

export const AccordionItemT = z.object({
  title: z.string(),
  text: z.any(),
})
export type AccordionItemT = z.infer<typeof AccordionItemT>;
export const AccordionCompT = z.object({
  __typename: z.literal("ComponentContentAccordion"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  items: AccordionItemT.array(),
})
export type AccordionCompT = z.infer<typeof AccordionCompT>;

export const FormBlockItemT = z.object({
  title: z.string(),
  description: z.string().nullable(),
  iconCustom: CustomIconEnum.nullable(),
  iconReact: z.string().nullable(),
  image: ImageT,
  imageDark: ImageT,
})
export type FormBlockItemT = z.infer<typeof FormBlockItemT>;
export const FormBlockCompT = z.object({
  __typename: z.literal("ComponentContentFormBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  image: ImageT,
  imageDark: ImageT,
  list: FormBlockItemT.array(),
  largeTitles: z.boolean().nullable(),
  color: z.string().nullable(),
  colorDark: z.string().nullable(),
  buttonTitle: z.string().nullable(),
  buttonLink: z.string().nullable(),
  inNewTab: z.boolean().nullable(),
  formTitle: z.string().nullable(),
  formDescription: z.string().nullable(),
})
export type FormBlockCompT = z.infer<typeof FormBlockCompT>;

export const ErrorCompT = z.object({
  code: z.string(),
  message: z.string().nullable(),
})
export type ErrorCompT = z.infer<typeof ErrorCompT>;

export const DynamicZoneT = z.discriminatedUnion("__typename", [
  TextCompT,
  TextImagesCompT,
  TextGridCompT,
  CollectionAllCompT,
  ContactsCompT,
  IconsBlockCompT,
  SliderEntityCompT,
  SliderPhotosCompT,
  TimelineCompT,
  NumbersCompT,
  FilesCompT,
  AccordionCompT,
  FormBlockCompT,
])
export type DynamicZoneT = z.infer<typeof DynamicZoneT>;




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
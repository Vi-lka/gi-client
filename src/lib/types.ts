import { z } from "zod";

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


export const CollectionAllEnum = z.enum([
  "educational-programs", 
  "additional-education", 
  "graduates",
  "lecturers",
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

export const ErrorCompT = z.object({
  code: z.string(),
  message: z.string().nullable(),
})
export type ErrorCompT = z.infer<typeof ErrorCompT>;

export const DynamicZoneT = z.discriminatedUnion("__typename", [
  TextCompT,
  TextImagesCompT,
  CollectionAllCompT,
  ContactsCompT,
  IconsBlockCompT,
  SliderEntityCompT,
  SliderPhotosCompT,
])
export type DynamicZoneT = z.infer<typeof DynamicZoneT>;

//.........................Entrance Page.........................//
export const EntrancePageT  = z.object({
  attributes: z.object({
    title: z.string(),
    content: DynamicZoneT.array(),
  }),
})
export type EntrancePageT = z.infer<typeof EntrancePageT>;

//.........................Entrance Page.........................//
export const MainPageT  = z.object({
  attributes: z.object({
    content: DynamicZoneT.array(),
  }),
})
export type MainPageT = z.infer<typeof MainPageT>;

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
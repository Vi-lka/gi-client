import { z } from "zod";
import { EducationalProgramSingleT, EmployeeSingleT, GraduateSingleT, DpoCoursesSingleT, StructureCategoryEnum } from "./entities";

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




//..................................................COMPONENTS..................................................//

//.........................Text.........................//
export const TextCompT = z.object({
  __typename: z.literal("ComponentContentTextBlock"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  text: z.any(),
})
export type TextCompT = z.infer<typeof TextCompT>;




//.........................TextImages.........................//
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




//.........................TextGrid.........................//
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




//.........................CollectionAll.........................//
export const CollectionAllViewEnum = z.enum([
  "classic",
  "bento",
]);
export type CollectionAllViewEnum = z.infer<typeof CollectionAllViewEnum>;

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
  entity: CollectionAllEnum.array(),
})
export type CollectionAllCompT = z.infer<typeof CollectionAllCompT>;




//.........................CollectionAllStructure.........................//
export const CollectionAllStructureCompT = z.object({
  __typename: z.literal("ComponentContentCollectionAllStructure"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  category: StructureCategoryEnum.nullable(),
  type: z.object({
    data: z.object({
      id: z.string(),
    }).nullable()
  }),
  view: CollectionAllViewEnum,
})
export type CollectionAllStructureCompT = z.infer<typeof CollectionAllStructureCompT>;




//.........................Contacts.........................//
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




//.........................IconsBlock.........................//
export const IconsBlockItemT = z.object({
  title: z.string(),
  iconReact: z.string().nullable(),
  image: ImageT,
  imageDark: ImageT,
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




//.........................SliderEntity.........................//
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




//.........................SliderPhotos.........................//
export const SliderPhotosCompT = z.object({
  __typename: z.literal("ComponentContentSliderPhotos"),
  title: z.string().nullable(),
  link: z.string().nullable(),
  linkTitle: z.string().nullable(),
  photos: ImagesArrayT,
})
export type SliderPhotosCompT = z.infer<typeof SliderPhotosCompT>;




//.........................Timeline.........................//
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




//.........................Numbers.........................//
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




//.........................Files.........................//
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




//.........................Accordion.........................//
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




//.........................FormBlock.........................//
export const FormBlockItemT = z.object({
  title: z.string(),
  description: z.string().nullable(),
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




//..................................................DynamicZone..................................................//
export const DynamicZoneT = z.discriminatedUnion("__typename", [
  TextCompT,
  TextImagesCompT,
  TextGridCompT,
  CollectionAllCompT,
  CollectionAllStructureCompT,
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




//.........................Error.........................//
export const ErrorCompT = z.object({
  code: z.string(),
  message: z.string().nullable(),
})
export type ErrorCompT = z.infer<typeof ErrorCompT>;
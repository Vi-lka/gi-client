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

//.........................COMPONENTS.........................//
export const TextComp = z.object({
  __typename: z.literal("ComponentContentText"),
  title: z.string().nullable(),
  text: z.any(),
})
export type TextComp = z.infer<typeof TextComp>;

export const AlignEnum = z.enum(["left", "right"]);
export type AlignEnum = z.infer<typeof AlignEnum>;

export const TextImagesComp = z.object({
  __typename: z.literal("ComponentContentTextImages"),
  title: z.string().nullable(),
  text: z.any(),
  alignImages: AlignEnum,
  images: ImagesArrayT,
})
export type TextImagesComp = z.infer<typeof TextImagesComp>;

export const DynamicZoneT = z.union([
  TextComp,
  TextImagesComp,
])
export type DynamicZoneT = z.infer<typeof DynamicZoneT>;

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
    data: z.object({
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
    }).array(),
})
export type EducationalProgramsT = z.infer<typeof EducationalProgramsT>;

//.........................About Institut.........................//
export const EntranceInfoT  = z.object({
  attributes: z.object({
    linkName: z.string(),
    content: DynamicZoneT.array(),
  }),
})
export type EntranceInfoT = z.infer<typeof EntranceInfoT>;
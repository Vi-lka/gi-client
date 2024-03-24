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


//.........................Educational Programs.........................//
export const EducationalProgramTypeEnum = z.enum(["bachelor", "magistracy", "postgraduate"]);
export type EducationalProgramTypeEnum = z.infer<typeof EducationalProgramTypeEnum>;

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
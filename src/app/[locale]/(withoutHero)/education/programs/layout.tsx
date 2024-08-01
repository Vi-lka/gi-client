import { getDictionary } from '@/lib/getDictionary';
import type { Metadata } from 'next';
import type { ReactNode } from 'react'

export async function generateMetadata({ 
  params: { locale }
}:  { 
  params: { locale: string }
}): Promise<Metadata> {

  const dict = await getDictionary(locale)

  return {
    title: dict.EduEducationalProgramsPage.title,
    openGraph: {
      title: dict.EduEducationalProgramsPage.title,
      images: "/hero-image.jpeg",
      locale: locale,
    }
  }
}

export default function LayoutEducation({children}: {children: ReactNode;}) {
  return children
}

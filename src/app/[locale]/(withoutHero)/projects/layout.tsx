import getMetadataProjects from '@/lib/queries/metadata/projects/getMetadataProjects';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ 
  params: { locale }
}:  { 
  params: { locale: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataProjects(locale) ]);

  if (dataResult.status === "rejected") {
    console.error(dataResult.reason)
    return {
      title: "Проекты",
      openGraph: {
        title: "Проекты",
        images: "/hero-image.jpeg",
        locale: locale,
      }
    }
  }

  const metadata = dataResult.value.data
  const i18 = dataResult.value.i18

  const languages = {} as { [key: string]: string }

  i18.map(item => {
    const key = item.attributes.code
    languages[key] = (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/${key}/projects`;
  })

  return {
    title: metadata.title,
    description: metadata.navBarConfig?.navBarDescription,
    openGraph: {
      title: metadata.title,
      description: metadata.navBarConfig?.navBarDescription ? metadata.navBarConfig?.navBarDescription : undefined,
      images: metadata.navBarConfig?.navBarImage.data?.attributes.url ?? "/hero-image.jpeg",
      locale: locale,
    },
    alternates: {
      canonical: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/projects",
      languages: languages
    }
  }
}

export default function LayoutProjects({children}: {children: ReactNode}) {
  return children
}
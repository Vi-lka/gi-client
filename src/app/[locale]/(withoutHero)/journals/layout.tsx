import getMetadataJournals from '@/lib/queries/metadata/journals/getMetadataJournals';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export async function generateMetadata({ 
  params: { locale }
}:  { 
  params: { locale: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataJournals(locale) ]);

  if (dataResult.status === "rejected") {
    console.error(dataResult.reason)
    return {
      title: "Журналы",
      openGraph: {
        title: "Журналы",
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
    languages[key] = (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/${key}/journals`;
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
      canonical: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/journals",
      languages: languages
    }
  }
}

export default function LayoutJournals({children}: {children: ReactNode}) {
  return children
}
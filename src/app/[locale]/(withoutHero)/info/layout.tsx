import getMetadataInfo from '@/lib/queries/metadata/info/getMetadataInfo';
import type { Metadata } from 'next';
import type { ReactNode } from 'react'

export async function generateMetadata({ 
  params: { locale }
}:  { 
  params: { locale: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataInfo(locale) ]);

  if (dataResult.status === "rejected") return {}

  const metadata = dataResult.value.data
  const i18 = dataResult.value.i18

  const languages = {} as { [key: string]: string }

  i18.map(item => {
    const key = item.attributes.code
    languages[key] = (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/${key}/info`;
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
      canonical: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + "/info",
      languages: languages
    }
  }
}

export default function LayoutInfo({children}: {children: ReactNode;}) {
  return children
}

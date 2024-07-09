import getMetadataAdditionalPage from '@/lib/queries/metadata/additional-pages/getMetadataAdditionalPage';
import type { Metadata } from 'next';
import type { ReactNode } from 'react'

export async function generateMetadata({ 
  params
}:  { 
  params: { locale: string, slug: string[] }
}): Promise<Metadata> {

  const lastSlug = params.slug.pop()
  const remainingSlugs = params.slug

  const [ dataResult ] = await Promise.allSettled([ getMetadataAdditionalPage(params.locale, lastSlug, remainingSlugs) ]);

  if (dataResult.status === "rejected") return {}

  const metadata = dataResult.value.data
  const i18 = dataResult.value.i18

  const languages = {} as { [key: string]: string }

  i18.map(item => {
    const key = item.attributes.code
    languages[key] = (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/${key}/${remainingSlugs.join("/")}/${lastSlug}`;
  })

  return {
    title: metadata.title,
    description: metadata.navBarConfig?.navBarDescription,
    openGraph: {
      title: metadata.title,
      description: metadata.navBarConfig?.navBarDescription ? metadata.navBarConfig?.navBarDescription : undefined,
      images: metadata.navBarConfig?.navBarImage.data?.attributes.url ?? "/hero-image.jpeg",
      locale: params.locale,
    },
    alternates: {
      canonical: (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/${remainingSlugs.join("/")}/${lastSlug}`,
      languages: languages
    }
  }
}

export default function LayoutAdditionalPage({children}: {children: ReactNode;}) {
  return children
}

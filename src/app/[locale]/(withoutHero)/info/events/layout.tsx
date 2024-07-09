import getMetadataEvents from '@/lib/queries/metadata/info/getMetadataEvents';
import type { Metadata } from 'next';
import type { ReactNode } from 'react'

export async function generateMetadata({ 
  params: { locale }
}:  { 
  params: { locale: string }
}): Promise<Metadata> {

  const [ dataResult ] = await Promise.allSettled([ getMetadataEvents(locale) ]);

  if (dataResult.status === "rejected") return {}

  const metadata = dataResult.value.data

  return {
    title: metadata.title,
    description: metadata.navBarConfig?.navBarDescription,
    openGraph: {
      title: metadata.title,
      description: metadata.navBarConfig?.navBarDescription ? metadata.navBarConfig?.navBarDescription : undefined,
      images: metadata.navBarConfig?.navBarImage.data?.attributes.url ?? "/hero-image.jpeg",
      locale: locale,
    }
  }
}

export default function LayoutEvents({children}: {children: ReactNode;}) {
  return children
}

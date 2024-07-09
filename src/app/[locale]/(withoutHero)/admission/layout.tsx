import getMetadataAdmission from '@/lib/queries/metadata/admission/getMetadataAdmission';
import type { Metadata } from 'next';
import type {ReactNode} from 'react';

export async function generateMetadata({ 
    params: { locale }
  }:  { 
    params: { locale: string }
  }): Promise<Metadata> {
  
    const [ dataResult ] = await Promise.allSettled([ getMetadataAdmission(locale) ]);
  
    if (dataResult.status === "rejected") return {}
  
    const metadata = dataResult.value.data
  
    return {
      title: metadata.title,
      description: metadata.navBarConfig?.navBarDescription,
      openGraph: {
        title: metadata.title,
        description: metadata.navBarConfig?.navBarDescription ? metadata.navBarConfig?.navBarDescription : undefined,
        images: metadata.navBarConfig?.navBarImage.data?.attributes.url,
        locale: locale,
      },
    }
}

type Props = {
  children: ReactNode;
};

export default function AdmissionLayout({children}: Props) {
  return children;
}
import type { DynamicZoneT } from '@/lib/types'
import React from 'react'
import RichText from './blocks/RichText';
import RichTextImage from './blocks/RichTextImage';
import CollectionAll from './blocks/entities/CollectionAll';
import IconsBlock from './blocks/icon-block/IconsBlock';
import ContactsBlock from './blocks/ContactsBlock';
import SliderPhotos from './blocks/sliders/SliderPhotos';
import SliderEntity from './blocks/sliders/SliderEntity';
import RichTextGrid from './blocks/RichTextGrid';
import Timeline from './blocks/timeline/Timeline';
import { cn } from '@/lib/utils';
import Numbers from './blocks/numbers/Numbers';
import Files from './blocks/Files';
import FormBlock from './blocks/form-block/FormBlock';
import { ClientHydration } from '../ClientHydration';
import SliderLoading from '../loadings/SliderLoading';
import AccordionBlock from './blocks/AccordionBlock';

export default function DynamicZone({
  item,
  searchParams,
  headingBig,
}: {
  item: DynamicZoneT,
  searchParams: { [key: string]: string | string[] | undefined },
  headingBig?: boolean,
}) {

  switch (item.__typename) {
    case "ComponentContentTextBlock":
      return <RichText data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentTextImages":
      return <RichTextImage data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentTextGrid":
      return <RichTextGrid data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />

    case "ComponentContentIconsBlock":
      return <IconsBlock data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;
    
    case "ComponentContentContacts":
      return <ContactsBlock data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;
    
    case "ComponentContentSliderPhotos":
      return <SliderPhotos data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentCollectionAll":
      return <CollectionAll data={item} headingBig={headingBig} searchParams={searchParams} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentTimeline":
      return <Timeline data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentNumbers":
      return <Numbers data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentFiles":
      return <Files data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentAccordion":
      return <AccordionBlock data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />

    case "ComponentContentFormBlock":
      return <FormBlock data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />;

    case "ComponentContentSliderEntity":
      return (
        <ClientHydration fallback={<SliderLoading className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />}>
          <SliderEntity data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />
        </ClientHydration>
      );
      
    default:
      return null;
  }
}

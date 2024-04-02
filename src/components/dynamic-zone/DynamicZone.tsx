import type { DynamicZoneT } from '@/lib/types'
import React from 'react'
import RichText from './blocks/RichText';
import RichTextImage from './blocks/RichTextImage';
import CollectionAll from './blocks/entities/CollectionAll';
import IconsBlock from './blocks/icon-block/IconsBlock';
import ContactsBlock from './blocks/ContactsBlock';
import SliderEntity from './blocks/sliders/SliderEntity';
import SliderPhotos from './blocks/sliders/SliderPhotos';

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
      return <RichText data={item} headingBig={headingBig} />;

    case "ComponentContentTextImages":
      return <RichTextImage data={item} headingBig={headingBig} />;

    case "ComponentContentIconsBlock":
      return <IconsBlock data={item} headingBig={headingBig} />;
    
    case "ComponentContentContacts":
      return <ContactsBlock data={item} headingBig={headingBig} />;

    case "ComponentContentSliderEntity":
      return <SliderEntity data={item} headingBig={headingBig} />;
    
    case "ComponentContentSliderPhotos":
      return <SliderPhotos data={item} headingBig={headingBig} />;

    case "ComponentContentCollectionAll":
      return <CollectionAll data={item} headingBig={headingBig} searchParams={searchParams} />;
      
    default:
      return null;
  }
}

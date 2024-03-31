import type { DynamicZoneT } from '@/lib/types'
import React from 'react'
import RichText from './blocks/RichText';
import RichTextImage from './blocks/RichTextImage';
import CollectionAll from './blocks/entities/CollectionAll';
import IconsBlock from './blocks/icon-block/IconsBlock';
import ContactsBlock from './blocks/ContactsBlock';

export default function DynamicZone({
  item,
  searchParams,
}: {
  item: DynamicZoneT,
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  switch (item.__typename) {
    case "ComponentContentTextBlock":
      return <RichText data={item} />;

    case "ComponentContentTextImages":
      return <RichTextImage data={item} />;

    case "ComponentContentCollectionAll":
      return <CollectionAll data={item} searchParams={searchParams} />;

    case "ComponentContentIconsBlock":
      return <IconsBlock data={item} />
    
    case "ComponentContentContacts":
      return <ContactsBlock data={item} />

    default:
      return null;
  }
}

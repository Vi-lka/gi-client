import type { DynamicZoneT } from '@/lib/types'
import React from 'react'
import RichText from './RichText'
import RichTextImage from './RichTextImage'
import CollectionAll from './CollectionAll'
import IconsBlock from './icon-block/IconsBlock'

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

    default:
      return null;
  }
}

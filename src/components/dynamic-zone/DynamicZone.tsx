/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { DynamicZoneT } from '@/lib/types'
import React from 'react'
import RichText from './RichText'
import RichTextImage from './RichTextImage'

export default function DynamicZone({
  item
}: {
  item: DynamicZoneT
}) {
  return (
    item.__typename === "ComponentContentText"
      ? (
        <RichText title={item.title} text={item.text} />
      )
    : item.__typename === "ComponentContentTextImages"
      ? (
        <RichTextImage title={item.title} text={item.text} alignImages={item.alignImages} images={item.images} />
      )
    : null
  )
}

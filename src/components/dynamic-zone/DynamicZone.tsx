import type { DynamicZoneT } from '@/lib/types'
import React from 'react'
import SliderEntity from './blocks/sliders/SliderEntity';
import Timeline from './blocks/timeline/Timeline';
import { cn } from '@/lib/utils';
import Numbers from './blocks/numbers/Numbers';
import Files from './blocks/Files';
import FormBlock from './blocks/form-block/FormBlock';
import AccordionBlock from './blocks/AccordionBlock';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
import CarouselLoading from '../loadings/CarouselLoading';
import { Loader2 } from 'lucide-react';
 
const RichText = dynamic(
  () => import('./blocks/RichText'), {loading: () => <Skeleton className='w-full aspect-square'/>}
)
const RichTextImage = dynamic(
  () => import('./blocks/RichTextImage'),
  {loading: () => (
    <div className='w-full lg:flex-row flex-col items-center lg:gap-16 gap-6'>
      <Skeleton className='lg:w-1/2 w-full aspect-[1/2]'/>
      <Skeleton className='lg:w-1/2 w-full aspect-[1/2]'/>
    </div>
  )}
)
const RichTextGrid = dynamic(
  () => import('./blocks/RichTextGrid'),
  {loading: () => (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <Skeleton className='w-full h-7'/>
          <Skeleton className='w-full aspect-square'/>
        </div>
      ))}
    </div>
  )}
)
const IconsBlock = dynamic(
  () => import('./blocks/icon-block/IconsBlock'),
  {loading: () => (
    <Skeleton className='w-full aspect-video flex items-center justify-center'>
      <Loader2 className='animate-spin'/>
    </Skeleton>
  )}
)
const ContactsBlock = dynamic(
  () => import('./blocks/ContactsBlock'),
  {loading: () => (
    <div className='w-full flex gap-8 justify-between'>
      <div className='max-w-80'>
        <Skeleton className='w-full h-7'/>
        <Skeleton className='w-full h-7'/>
        <Skeleton className='w-full h-7'/>
      </div>
      <Skeleton className='w-2/5 lg:block hidden aspect-video'/>
    </div>
  )}
)
const SliderPhotos = dynamic(
  () => import('./blocks/sliders/SliderPhotos'), {loading: () => <CarouselLoading className='w-full h-full sm:aspect-[2/1] aspect-square'/>}
)

const CollectionAll = dynamic(
  () => import('./blocks/entities/CollectionAll'),
  {loading: () => (
    <Skeleton className='w-full aspect-square flex items-center justify-center'>
      <Loader2 className='animate-spin'/>
    </Skeleton>
  )}
)

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
      return <SliderEntity data={item} headingBig={headingBig} className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} />
      
    default:
      return null;
  }
}

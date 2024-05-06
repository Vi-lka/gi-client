import React from 'react'
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';
import CarouselLoading from '../loadings/CarouselLoading';
import { Loader2 } from 'lucide-react';
import IconsBlockLoading from '../loadings/IconsBlockLoading';
import TextLoading from '../loadings/TextLoading';
import TextImageLoading from '../loadings/TextImageLoading';
import TextGridLoading from '../loadings/TextGridLoading';
import ContactsBlockLoading from '../loadings/ContactsBlockLoading';
import TimelineLoading from '../loadings/TimelineLoading';
import NumbersLoading from '../loadings/NumbersLoading';
import ListLoading from '../loadings/ListLoading';
import "./blocks/timeline/timeline.css"
import type { DynamicZoneT } from '@/lib/types/components';
import CollectionAllLoading from '../loadings/CollectionAllLoading';
import BentoLoading from '../loadings/BentoLoading';
 
const RichText = dynamic(
  () => import('./blocks/RichText'), {loading: () => <TextLoading />}
)

const RichTextImage = dynamic(
  () => import('./blocks/RichTextImage'), {loading: () => <TextImageLoading />}
)

const RichTextGrid = dynamic(
  () => import('./blocks/RichTextGrid'), {loading: () => <TextGridLoading />}
)

const ContactsBlock = dynamic(
  () => import('./blocks/ContactsBlock'), {loading: () => <ContactsBlockLoading />}
)

const Timeline = dynamic(
  () => import('./blocks/timeline/Timeline'), {loading: () => <TimelineLoading />}
)

const Numbers = dynamic(
  () => import('./blocks/numbers/Numbers'), {loading: () => <NumbersLoading />}
)

const Files = dynamic(
  () => import('./blocks/Files'), {loading: () => <ListLoading />}
)

const AccordionBlock = dynamic(
  () => import('./blocks/AccordionBlock'), {loading: () => <ListLoading />}
)

const IconsBlock = dynamic(
  () => import('./blocks/icon-block/IconsBlock'), {loading: () => <IconsBlockLoading isList={false} className='w-full'/>}
)

const BentoGridBlock = dynamic(
  () => import('./blocks/BentoGridBlock'), {loading: () => <BentoLoading />}
)

const SliderPhotos = dynamic(
  () => import('./blocks/sliders/SliderPhotos'), {loading: () => <CarouselLoading className='w-full h-full sm:aspect-[2/1] aspect-square'/>}
)

const SliderEntity = dynamic(
  () => import('./blocks/sliders/SliderEntity'), {loading: () => <CarouselLoading className='w-full h-full sm:aspect-[2/1] aspect-square'/>}
)

const CollectionAll = dynamic(
  () => import('./blocks/entities/CollectionAll'), {loading: () => <CollectionAllLoading />}
)

const FormBlock = dynamic(
  () => import('./blocks/form-block/FormBlock'), {loading: () => (
    <div className='w-full lg:pt-14 pt-10'>
      <Skeleton className='w-full aspect-[4/1] flex items-center justify-center'>
        <Loader2 className='animate-spin'/>
      </Skeleton>
    </div>
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
      return <RichText 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentTextImages":
      return <RichTextImage 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentTextGrid":
      return <RichTextGrid 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />

    case "ComponentContentIconsBlock":
      return <IconsBlock 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;
    
    case "ComponentContentContacts":
      return <ContactsBlock 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;
    
    case "ComponentContentSliderPhotos":
      return <SliderPhotos 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentCollectionAll":
      return <CollectionAll 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              searchParams={searchParams} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentTimeline":
      return <Timeline 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentNumbers":
      return <Numbers 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentFiles":
      return <Files 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentAccordion":
      return <AccordionBlock 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />

    case "ComponentContentBentoGrid":
      return <BentoGridBlock 
              key={`key-${item.__typename}-${item.link}`}
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />

    case "ComponentContentFormBlock":
      return <FormBlock 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />;

    case "ComponentContentSliderEntity":
      return <SliderEntity 
              key={`key-${item.__typename}-${item.link}`} 
              data={item} 
              headingBig={headingBig} 
              className={cn(item.title ? "lg:pt-28 pt-20" : "lg:pt-14 pt-10")} 
            />
      
    default:
      return null;
  }
}

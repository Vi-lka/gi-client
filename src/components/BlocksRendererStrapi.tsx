/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';
import ImageComp from './ImageComp';
import { TypographyBlockquote, TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyH5, TypographyH6, TypographyList, TypographyP } from './typography';

interface TextInlineNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}
interface LinkInlineNode {
    type: 'link';
    url: string;
    children: TextInlineNode[];
}
interface ListItemInlineNode {
    type: 'list-item';
    children: DefaultInlineNode[];
}
type DefaultInlineNode = TextInlineNode | LinkInlineNode;
interface ParagraphBlockNode {
    type: 'paragraph';
    children: DefaultInlineNode[];
}
interface QuoteBlockNode {
    type: 'quote';
    children: DefaultInlineNode[];
}
interface CodeBlockNode {
    type: 'code';
    children: DefaultInlineNode[];
}
interface HeadingBlockNode {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    children: DefaultInlineNode[];
}
interface ListBlockNode {
    type: 'list';
    format: 'ordered' | 'unordered';
    children: (ListItemInlineNode | ListBlockNode)[];
}
interface ImageBlockNode {
    type: 'image';
    image: {
        name: string;
        alternativeText?: string | null;
        url: string;
        caption?: string | null;
        width: number;
        height: number;
        formats?: Record<string, unknown>;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        previewUrl?: string | null;
        provider: string;
        // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        provider_metadata?: unknown | null;
        createdAt: string;
        updatedAt: string;
    };
    children: [{
        type: 'text';
        text: '';
    }];
}
type RootNode = ParagraphBlockNode | QuoteBlockNode | CodeBlockNode | HeadingBlockNode | ListBlockNode | ImageBlockNode;

export default function BlocksRendererStrapi({
    content
}: {
    content: any
}) {

  if (!content) return null
  
  return (
    <BlocksRenderer 
        content={content as RootNode[]}
        blocks={{
            paragraph: ({ children }) => <TypographyP>{children}</TypographyP>,
            heading: ({ children, level }) => {
              switch (level) {
                case 1:
                  return <TypographyH1>{children}</TypographyH1>
                case 2:
                  return <TypographyH2>{children}</TypographyH2>
                case 3:
                  return <TypographyH3>{children}</TypographyH3>
                case 4:
                  return <TypographyH4>{children}</TypographyH4>
                case 5:
                  return <TypographyH5>{children}</TypographyH5>
                case 6:
                  return <TypographyH6>{children}</TypographyH6>
                default:
                  return <TypographyH1>{children}</TypographyH1>
              }
            },
            list: ({ children, format }) => {
              switch (format) {
                case "ordered":
                  return <ol className='list-decimal mb-3 pl-4 flex flex-col gap-1.5'>{children}</ol>
                case "unordered":
                  return <TypographyList>{children}</TypographyList>
                default:
                  return <TypographyList>{children}</TypographyList>
              }
            },
            quote: ({ children }) => {
              return (
                <TypographyBlockquote>
                    {children}
                </TypographyBlockquote>
              )
            },
            code: ({ children }) => (
              <code className="relative rounded bg-muted/50 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {children}
              </code>
            ),
            link: ({ children, url }) => (
              <Link href={url} target='__blank' className='text-primary font-medium underline underline-offset-2 hover:underline-offset-4 transition-all'>
                {children}
              </Link>
            ),
            image: ({ image }) => (
              <ImageComp
                src={"/uploads/" + image.hash + image.ext}
                fill={false}
                width={image.width < 1000 ? image.width : 450}
                height={image.height < 1000 ? image.height : 450}
                className="object-contain w-full overflow-hidden rounded-3xl"
                alt={image.alternativeText ? image.alternativeText : ""}
                priority
              />
            )
        }}
    />
  )
}
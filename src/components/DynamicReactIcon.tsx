/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import dynamic from "next/dynamic";
import type { IconType } from "react-icons/lib";
import { Skeleton } from "./ui/skeleton";

const DynamicReactIcon = ({
  icon,
  size = 20,
  className,
}: {
  icon: string;
  size?: number,
  className?: string,
}) => {

  const lib = icon.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(" ")[0].toLocaleLowerCase() as keyof typeof Icons;

  const Icons = {
    ci: dynamic(
      async () => {
        const mod = await import("react-icons/ci");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    fa: dynamic(
      async () => {
        const mod = await import("react-icons/fa");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    io: dynamic(
      async () => {
        const mod = await import("react-icons/io");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    rx: dynamic(
      async () => {
        const mod = await import("react-icons/rx");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    md: dynamic(
      async () => {
        const mod = await import("react-icons/md");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    ti: dynamic(
      async () => {
        const mod = await import("react-icons/ti");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    go: dynamic(
      async () => {
        const mod = await import("react-icons/go");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    ai: dynamic(
      async () => {
        const mod = await import("react-icons/ai");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    bs: dynamic(
      async () => {
        const mod = await import("react-icons/bs");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    ri: dynamic(
      async () => {
        const mod = await import("react-icons/ri");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    gr: dynamic(
      async () => {
        const mod = await import("react-icons/gr");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    hi: dynamic(
      async () => {
        const mod = await import("react-icons/hi");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    sl: dynamic(
      async () => {
        const mod = await import("react-icons/sl");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    im: dynamic(
      async () => {
        const mod = await import("react-icons/im");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    bi: dynamic(
      async () => {
        const mod = await import("react-icons/bi");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    cg: dynamic(
      async () => {
        const mod = await import("react-icons/cg");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    vsc: dynamic(
      async () => {
        const mod = await import("react-icons/vsc");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    ),
    tfi: dynamic(
      async () => {
        const mod = await import("react-icons/tfi");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Skeleton className='lg:w-20 sm:w-16 w-14 lg:h-20 sm:h-16 h-14 sm:mx-0 mx-auto rounded-full' /> }
    )
  };

  const Icon = lib && icon ? Icons[lib] as IconType : null;

  if (!Icon) return <></>;

  return (
      <Icon size={size} className={className} />
  );
};

export default DynamicReactIcon;

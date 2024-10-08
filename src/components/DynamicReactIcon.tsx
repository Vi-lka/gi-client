/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import type { IconType } from "react-icons/lib";

const DynamicReactIcon = ({
  icon,
  size = 20,
  className,
}: {
  icon: string;
  size?: number,
  className?: string,
}) => {

  const lib = icon.replace(/([a-z0-9])([A-Z0-9])/g, '$1 $2').split(" ")[0].toLocaleLowerCase() as keyof typeof Icons;

  const Icons = {
    tb: dynamic(
      async () => {
        const mod = await import("react-icons/tb");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    si: dynamic(
      async () => {
        const mod = await import("react-icons/si");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    ci: dynamic(
      async () => {
        const mod = await import("react-icons/ci");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    fa: dynamic(
      async () => {
        const mod = await import("react-icons/fa");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    io: dynamic(
      async () => {
        const mod = await import("react-icons/io");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    rx: dynamic(
      async () => {
        const mod = await import("react-icons/rx");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    md: dynamic(
      async () => {
        const mod = await import("react-icons/md");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    ti: dynamic(
      async () => {
        const mod = await import("react-icons/ti");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    go: dynamic(
      async () => {
        const mod = await import("react-icons/go");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    ai: dynamic(
      async () => {
        const mod = await import("react-icons/ai");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    bs: dynamic(
      async () => {
        const mod = await import("react-icons/bs");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    ri: dynamic(
      async () => {
        const mod = await import("react-icons/ri");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    gr: dynamic(
      async () => {
        const mod = await import("react-icons/gr");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    hi: dynamic(
      async () => {
        const mod = await import("react-icons/hi");
        // @ts-expect-error
        if (!mod[icon]) {
          const mod2 = await import("react-icons/hi2");
        // @ts-expect-error
          return mod2[icon]
        }
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    sl: dynamic(
      async () => {
        const mod = await import("react-icons/sl");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    im: dynamic(
      async () => {
        const mod = await import("react-icons/im");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    bi: dynamic(
      async () => {
        const mod = await import("react-icons/bi");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    cg: dynamic(
      async () => {
        const mod = await import("react-icons/cg");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    vsc: dynamic(
      async () => {
        const mod = await import("react-icons/vsc");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    tfi: dynamic(
      async () => {
        const mod = await import("react-icons/tfi");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    ),
    fi: dynamic(
      async () => {
        const mod = await import("react-icons/fi");
        // @ts-expect-error
        return mod[icon];
      },
      { loading: () => <Loader2 className={cn("animate-spin", className)} /> }
    )
  };

  const Icon = lib && icon ? Icons[lib] as IconType : null;

  if (!Icon) return <></>;

  return (
      <Icon size={size} className={className} />
  );
};

export default DynamicReactIcon;

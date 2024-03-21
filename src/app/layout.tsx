import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";

const din = localFont({
  variable: "--Din",
  src: [
    {
      path: './dinPro/dinpro_light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './dinPro/dinpro.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './dinPro/dinpro_medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './dinPro/dinpro_bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './dinPro/dinpro_black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
})

const cera = localFont({
  variable: "--Cera",
  src: [
    {
      path: './ceraPro/CeraPro-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './ceraPro/CeraPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './ceraPro/CeraPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ceraPro/CeraPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './ceraPro/CeraPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './ceraPro/CeraPro-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: "Гуманитарный институт СФУ",
  description: "Поступай в Гуманитарный!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={"ru"}
      suppressHydrationWarning
      className={`${din.variable} ${cera.variable}`}
    >
      <body className='font-Din relative bg-background'>
        <Header />
        <main className="h-[200vh]">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { locales } from "@/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

const din = localFont({
  variable: "--Din",
  src: [
    {
      path: './(fonts)/dinPro/dinpro_light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './(fonts)/dinPro/dinpro.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './(fonts)/dinPro/dinpro_medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './(fonts)/dinPro/dinpro_bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './(fonts)/dinPro/dinpro_black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
})

const cera = localFont({
  variable: "--Cera",
  src: [
    {
      path: './(fonts)/ceraPro/CeraPro-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './(fonts)/ceraPro/CeraPro-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './(fonts)/ceraPro/CeraPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './(fonts)/ceraPro/CeraPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './(fonts)/ceraPro/CeraPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './(fonts)/ceraPro/CeraPro-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: "Гуманитарный институт СФУ",
  description: "Поступай в Гуманитарный!",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {

  unstable_setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${din.variable} ${cera.variable} scroll-smooth`}
    >
      <body className='font-Din relative flex flex-col justify-between min-h-screen bg-background'>
        {children}
        <Toaster />
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

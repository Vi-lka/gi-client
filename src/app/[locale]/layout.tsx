import type { Metadata } from "next";
import localFont from 'next/font/local';
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { getDictionary } from "@/lib/getDictionary";
import Script from "next/script";
import Providers from "@/components/providers/Providers";

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

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: { locale: string },
  children: React.ReactNode;
}>) {

  const dict = await getDictionary(params.locale);

  return (
    <html
      lang={"ru"}
      suppressHydrationWarning
      className={`${din.variable} ${cera.variable} scroll-smooth`}
    >
      <body className='font-Din relative flex flex-col justify-between min-h-screen bg-background'>
        <Providers dictionary={dict}>
          {children}
          <Toaster />
          <Footer />
        </Providers>
        <SpeedInsights />
        <Analytics />
        <Script
          id="globalThis-polyfill"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t) {
                function e() {
                  var e = this || self;
                  e.globalThis = e;
                  delete t.prototype._T_;
                }
                "object" != typeof globalThis && (this ? e() : (t.defineProperty(t.prototype, "_T_", {
                  configurable: true,
                  get: e
                }), _T_));
              }(Object);
          `,
          }}
        ></Script>
      </body>
    </html>
  );
}

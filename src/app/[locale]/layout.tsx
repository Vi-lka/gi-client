import localFont from 'next/font/local';
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer/Footer";
import { getDictionary } from "@/lib/getDictionary";
import Script from "next/script";
import Providers from "@/components/providers/Providers";
import { ViewTransitions } from 'next-view-transitions'
import getMetadataSite from "@/lib/queries/metadata/getMetadataSite";
import type { Metadata } from 'next';

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

export const generateMetadata = async ({ 
  params: { locale }
}:  { 
  params: { locale: string }
}): Promise<Metadata> => {

  const [ dataResult ] = await Promise.allSettled([ getMetadataSite(locale) ]);

  if (dataResult.status === "rejected") {
    console.error(dataResult.reason)
    return {
      title: {
        template: `%s | ГИ СФУ`,
        default: "Гуманитарный институт СФУ",
      },
      metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
      openGraph: {
        title: "Гуманитарный институт СФУ",
        url: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
        siteName: "Гуманитарный институт СФУ",
        images: "/hero-image.jpeg",
        locale: locale,
        type: 'website',
      },
      other: {
        'google-site-verification': 'ML1di3QC2b-gJnCfwzk7JkJIn85VokcXy8lBy6jPaPg',
      },
    }
  }

  const metadata = dataResult.value.data
  const i18 = dataResult.value.i18

  const languages = {} as { [key: string]: string }

  i18.map(item => {
    const key = item.attributes.code
    languages[key] = (process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru") + `/${key}`;
  })

  return {
    title: {
      template: `%s | ${metadata.abbreviation}`,
      default: metadata.title,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
    description: metadata.description,
    keywords: metadata.keywords.map(item => item.word),
    category: metadata.category,
    publisher: metadata.publisher,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
      siteName: metadata.title,
      images: metadata.image.data ? metadata.image.data.attributes.url : "/hero-image.jpeg",
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: new URL(process.env.NEXT_PUBLIC_URL ?? "https://hi.sfu-kras.ru"),
      languages: languages
    },
    other: {
      'google-site-verification': 'ML1di3QC2b-gJnCfwzk7JkJIn85VokcXy8lBy6jPaPg',
    },
  }
}

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: { locale: string },
  children: React.ReactNode;
}>) {

  const dict = await getDictionary(params.locale);

  return (
    <ViewTransitions>
    <html
      lang={params.locale}
      suppressHydrationWarning
      className={`${din.variable} ${cera.variable} scroll-smooth`}
    >
      <body className='font-Din relative flex flex-col justify-between min-h-screen bg-background antialiased'>
        {/* Yandex.Metrika counter */}
        <Script
          id="ymetrika"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(97741801, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });`,
          }}
        ></Script>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://mc.yandex.ru/watch/97741801"
              style={{ position: "absolute", left: "-9999px" }}
              alt="" 
              width={1}
              height={1} 
            />
          </div>
        </noscript>
        {/* /Yandex.Metrika counter */}

        <Providers dictionary={dict}>
          {children}
          <Footer />
          <Toaster />
        </Providers>

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
    </ViewTransitions>
  );
}

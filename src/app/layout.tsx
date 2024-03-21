import type { Metadata } from "next";
import localFont from 'next/font/local';
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";

const roboto = Roboto_Flex({
  subsets: ["cyrillic", "latin"],
  variable: "--Roboto",
  // Fix font load errors: https://github.com/vercel/next.js/issues/45080#issuecomment-1646678980
  preload: false,
  display: "auto",
});

const cera = localFont({
  variable: "--Cera",
  preload: false,
  display: "auto",
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
      className={`${roboto.variable} ${cera.variable}`}
    >
      <body className='font-Roboto relative bg-background'>
        <Header />
        <main className=" h-[200vh]">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

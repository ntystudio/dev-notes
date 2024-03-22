import type { Metadata } from "next";
import "@/assets/globals.scss";
import "@/assets/MarkDownStyle.scss";
import "@/assets/scroll.scss";
import "@/assets/icons.scss";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import getPostMetaData from "@/util/getPostMetadata";
import MainHeader from "@/components/MainHeader";
import SideNav from "@/components/SideNav";
import Providers from "@/components/Provider";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: "NTY.studio Dev Notes",
  description: "A collection of dev notes from the NTY.studio team covering game design, game development, audio, animation, unreal engine, tech art, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const postMetaData = getPostMetaData();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="h-screen flex flex-col bg-light-color-base-00 dark:bg-dark-color-base-00">
        <Providers>
          <MainHeader postMetaData={postMetaData} />
          <main
            className="flex mt-1 flex-1 overflow-hidden"
            style={{
              maxHeight: "calc(100vh - 123px)",
              height: "calc(100vh - 123px)",
            }}
          >
            <div className="hidden lg:block">
              <SideNav postMetaData={postMetaData} />
            </div>
            <section
              id="main"
              className="flex-1 p-8 overflow-y-scroll scrollbar"
            >
              {children}
            </section>
          </main>
          <Footer />
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-6V16MQ9YNH" />
    </html>
  );
}

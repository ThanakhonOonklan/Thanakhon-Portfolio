import type { Metadata } from "next";
import { Anton, Inter, Sarabun } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers";
import { SITE_CONFIG } from "@/constants";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { VisitorTracker } from "@/components/VisitorTracker";

const anton = Anton({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: 'Thanakhon Oonklan | Full Stack Developer',
  description: SITE_CONFIG.description,
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${anton.variable} ${inter.variable} ${sarabun.variable} bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
        </AppProviders>

        <Analytics />
        <SpeedInsights />
        <VisitorTracker />
      </body>
    </html>
  );
}